import { translationDict } from '@/common/const';

export const jsonToEnterSeparatedString = (obj: object) => {
  const formatValue = (value: any) => {
    if (typeof value === 'number') {
      return value + '%';
    } else if (typeof value === 'object' && value !== null) {
      return '\n' + jsonToEnterSeparatedString(value);
    } else {
      return value;
    }
  };

  let result = '';

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Translate key if it exists in translation_dict
      const translatedKey = translationDict[key] || key;

      // Format value (handle nested objects recursively)
      // @ts-ignore
      const formattedValue = formatValue(obj[key]);

      // Append to result string
      result += `${translatedKey}: ${formattedValue}\n`;
    }
  }

  return result.trim(); // Remove trailing newline
};

export const classifyAxiosError = (error: any) => {
  if (!error.response) return '';
  if (!error.response.data) return '';
  if (!error.response.data.message) return '';
  // HTTP status error
  switch (error.response.data.message) {
    case '1-a':
      return '계정 정보가 없습니다';
    case '1-b':
      return '본인의 인증서가 아닙니다';
    case '2-a':
      return '요청 시간을 초과하였습니다';
    case '2-b':
      return '인증서에 필요한 정보가 없습니다';
    case '2-c':
      return '본인의 인증서가 아닙니다';
    case '2-d':
      return '만료된 인증서입니다';
    // Add other status codes as needed
    default:
      return '';
  }
};
