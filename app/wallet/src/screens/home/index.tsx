import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Linking,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { CredentialInfo, SavedCredentialInfo } from '@/entities/credentialInfo';
import { extractData } from '@/utils/jwt';
import { useIsFocused } from '@react-navigation/native';
import { frontendHostingUrl } from '@/common/config';
import { HStack } from 'react-native-flex-layout';
import { translationDict } from '@/common/const';
import { translate } from '@/common/util';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const vw = Dimensions.get('window').width;
  const vh = Dimensions.get('window').height;
  const [credentials, setCredentials] = useState<CredentialInfo[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    const _getData = async () => {
      const creds = await SecureStore.getItemAsync('credentials');
      if (creds) {
        const parsedCreds = JSON.parse(creds);
        const extractedCreds = await Promise.all(
          parsedCreds.map((c: SavedCredentialInfo) => extractData(c.vc)),
        );
        setCredentials(extractedCreds.filter((c) => c !== null));
      } else {
        setCredentials([]);
      }
    };
    _getData().catch((e) => {
      console.error(e);
      Alert.alert('인증서 정보 불러오기에 실패했습니다');
    });
  }, [isFocused, flag]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        height: vh,
        overflow: 'scroll',
      }}>
      <View
        style={{
          width: vw - 32,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 28, color: 'black' }}>내 지갑</Text>
      </View>
      <View
        style={{
          flex: 1,
          width: vw - 32,
          padding: 16,
          marginTop: 16,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: '#d0d0d0',
        }}>
        {credentials.length > 0 ? (
          <FlatList
            data={credentials}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    borderRadius: 8,
                    padding: 16,
                    borderWidth: 2,
                    borderColor: 'black',
                    marginBottom: 8,
                    backgroundColor: 'rgba(210, 247, 255)',
                  }}>
                  <Text style={{ fontSize: 24, color: 'black' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 20, color: 'black' }}>
                    {item.issuer}
                  </Text>
                  {item.fields.map((f, i) => {
                    return (
                      <Text style={{ fontSize: 18, color: 'black' }}>
                        {translationDict[f] +
                          ' : ' +
                          (item.values[i]
                            ? translate(JSON.stringify(item.values[i]))
                            : '없음')}
                      </Text>
                    );
                  })}
                  <Text style={{ fontSize: 20, color: 'black' }}>
                    {'발급일 - ' + item.issueDate.toLocaleDateString('ko-KR')}
                  </Text>
                </View>
              );
            }}
          />
        ) : (
          <View>
            <Text style={{ fontSize: 20, color: 'black' }}>
              {'텅텅 비었습니다'}
            </Text>
          </View>
        )}
      </View>
      <HStack>
        <TouchableWithoutFeedback
          onPress={() => {
            Linking.openURL(frontendHostingUrl + '/issuer1');
          }}>
          <View
            style={{
              padding: 16,
              marginTop: 16,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: '#d0d0d0',
              flex: 1,
              marginRight: 16,
            }}>
            <Text style={{ fontSize: 20, color: 'black' }}>
              {'인증서 발급받기(경력)'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            Linking.openURL(frontendHostingUrl + '/issuer2');
          }}>
          <View
            style={{
              padding: 16,
              marginTop: 16,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: '#d0d0d0',
              flex: 1,
            }}>
            <Text style={{ fontSize: 20, color: 'black' }}>
              {'인증서 발급받기(유전자)'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </HStack>
      <HStack>
        <TouchableWithoutFeedback
          onPress={() => {
            Linking.openURL(frontendHostingUrl + '/verifier1');
          }}>
          <View
            style={{
              padding: 16,
              marginTop: 16,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: '#d0d0d0',
              flex: 1,
              marginRight: 16,
            }}>
            <Text style={{ fontSize: 20, color: 'black' }}>
              {'인증하기(경력)'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            Linking.openURL(frontendHostingUrl + '/verifier2');
          }}>
          <View
            style={{
              padding: 16,
              marginTop: 16,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: '#d0d0d0',
              flex: 1,
              marginRight: 16,
            }}>
            <Text style={{ fontSize: 20, color: 'black' }}>
              {'인증하기 (유전자/결혼정보)'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            Linking.openURL(frontendHostingUrl + '/verifier3');
          }}>
          <View
            style={{
              padding: 16,
              marginTop: 16,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: '#d0d0d0',
              flex: 1,
            }}>
            <Text style={{ fontSize: 20, color: 'black' }}>
              {'인증하기 (유전자/생명보험)'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </HStack>
      <TouchableWithoutFeedback
        onPress={() => {
          SecureStore.deleteItemAsync('credentials').then(() => {
            setFlag((f) => !f);
          });
        }}>
        <View
          style={{
            padding: 16,
            marginTop: 16,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: '#d0d0d0',
          }}>
          <Text style={{ fontSize: 20, color: 'black' }}>
            {'인증서 다 찢어버리기'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeScreen;
