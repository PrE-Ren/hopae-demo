import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { extractData, makeVP } from '@/utils/jwt';
import axios from 'axios';
import { holderDid, translationDict } from '@/common/const';
import { CredentialInfo, SavedCredentialInfo } from '@/entities/credentialInfo';
import { classifyAxiosError } from '@/common/util';

type VerifyScreenProps = NativeStackScreenProps<RootStackParamList, 'Verify'>;
const VerifyScreen: FC<VerifyScreenProps> = ({ navigation, route }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [nonceUrl, setNonceUrl] = useState<string>('');
  const [fields, setFields] = useState<string[]>([]);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [flag, setFlag] = useState<boolean | null>(null);
  const vw = Dimensions.get('window').width;

  useEffect(() => {
    if (!route.params.url || !route.params.nonceUrl || !route.params.fields) {
      Alert.alert('비정상적인 접근입니다');
      navigation.goBack();
      return;
    }
    setUrl(route.params.url);
    setNonceUrl(route.params.nonceUrl);
    setFields(route.params.fields.split(','));
    setTarget(route.params.target);
    setOpen(true);
  }, [route.params]);

  useEffect(() => {
    if (!flag) {
      return;
    }
    const _inner = async () => {
      const creds = await SecureStore.getItemAsync('credentials');
      if (!creds) {
        Alert.alert(
          '인증서가 없습니다',
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
        return;
      }
      const credentials: SavedCredentialInfo[] = JSON.parse(creds);
      const promises = credentials.map(async (a) => {
        return await extractData(a.vc);
      });
      const results = await Promise.all(promises);
      console.log(results);
      const filteredResults = results.filter((data) => {
        return data && fields.every((val) => data.fields.includes(val));
      });
      if (filteredResults.length === 0) {
        Alert.alert(
          '요구한 정보를 제공할 인증서가 없습니다',
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
        return;
      }
      const nonceRes = await axios.post(nonceUrl, {
        holderDid: holderDid,
      });
      console.log('get nonce: ', nonceRes.data);
      const vp = await makeVP(
        filteredResults[0]!.rawString,
        fields,
        nonceRes.data.toString(),
      );
      console.log('vp created: ', vp);
      await axios.post(url, {
        vp: vp,
        holderDid: holderDid,
        type: target,
      });
      Alert.alert(
        '인증이 완료되었습니다',
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
    };
    _inner().catch((e) => {
      Alert.alert(
        '인증에 실패했습니다',
        classifyAxiosError(e),
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
  }, [flag]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <View
        style={{
          width: vw - 32,
          padding: 16,
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 28, color: 'black' }}>
          {'처리중입니다...'}
        </Text>
      </View>
      <Modal
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 8,
            padding: 16,
            borderWidth: 2,
            borderColor: 'black',
            marginBottom: 8,
            backgroundColor: 'rgba(210, 247, 255)',
          }}>
          <View style={{ padding: 8, paddingTop: 32 }}>
            <Text style={{ fontSize: 24, color: 'black' }}>
              {'인증 페이지에서 다음 사항을 요청합니다'}
            </Text>
          </View>
          <View style={{ padding: 8, paddingBottom: 32 }}>
            {fields.map((f) => {
              return (
                <Text style={{ fontSize: 18, color: 'black' }}>
                  {translationDict[f]}
                </Text>
              );
            })}
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setOpen(false);
              setFlag((f) => !f);
            }}>
            <View
              style={{
                borderRadius: 8,
                padding: 16,
                borderWidth: 2,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 20, color: 'black' }}>{'제공하기'}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

export default VerifyScreen;
