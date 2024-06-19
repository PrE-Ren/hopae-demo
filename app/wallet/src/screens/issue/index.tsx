import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import React, { FC, useEffect } from 'react';
import { Alert, Dimensions, Text, View } from 'react-native';
import { encrypt, extractData } from '@/utils/jwt';
import axios from 'axios';
import { holderDid } from '@/common/const';
import * as SecureStore from 'expo-secure-store';
import { SavedCredentialInfo } from '@/entities/credentialInfo';

type IssueScreenProps = NativeStackScreenProps<RootStackParamList, 'Issue'>;
const IssueScreen: FC<IssueScreenProps> = ({ navigation, route }) => {
  const vw = Dimensions.get('window').width;
  const saveVC = async (vc: string) => {
    const data = await extractData(vc);
    if (!data) {
      Alert.alert(
        '인증서가 잘못된 형식입니다',
        '',
        [
          {
            text: '확인',
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            navigation.navigate('Home');
          },
        },
      );
      return;
    }
    const credentials = await SecureStore.getItemAsync('credentials');
    let credentialsArr: SavedCredentialInfo[] = credentials
      ? JSON.parse(credentials)
      : [];
    if (credentialsArr.find((c) => c.issuer === data.issuer)) {
      credentialsArr = credentialsArr.filter((c) => c.issuer !== data.issuer);
    }
    await SecureStore.setItemAsync(
      'credentials',
      JSON.stringify([{ issuer: data.issuer, vc: vc }, ...credentialsArr]),
    );
    Alert.alert(
      '인증서가 발급되었습니다',
      '',
      [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          navigation.navigate('Home');
        },
      },
    );
  };

  useEffect(() => {
    if (!route.params.url || !route.params.nonceUrl) {
      Alert.alert('비정상적인 접근입니다');
      navigation.goBack();
      return;
    }

    const _inner = async () => {
      const nonceRes = await axios.post(route.params.nonceUrl, {
        holderDid: holderDid,
      });
      const res = await axios.post(route.params.url, {
        holderDid: holderDid,
        encryptedNonce: await encrypt(nonceRes.data),
      });
      await saveVC(res.data);
      Alert.alert('인증서 발급 완료', '인증서 발급이 완료되었습니다.');
      navigation.goBack();
    };
    _inner().catch((e) => {
      console.error(e);
      Alert.alert(
        '인증서 발급에 실패했습니다',
        '',
        [
          {
            text: '확인',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            navigation.goBack();
          },
        },
      );
    });
  }, [route.params]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <View
        style={{
          width: vw - 32,
          justifyContent: 'center',
          padding: 16,
        }}>
        <Text style={{ fontSize: 28, color: 'black' }}>
          {'인증서를 발급중입니다...'}
        </Text>
      </View>
    </View>
  );
};

export default IssueScreen;
