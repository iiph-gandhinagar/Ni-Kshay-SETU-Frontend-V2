import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { QuizSelectionCardProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Row } from '../commonComponents/row_column';

export const QuizSelectionCard: React.FC<QuizSelectionCardProps> = ({
  data,
  onSelect,
  selectedOption,
  assessmentId,
  isProAssessment,
  submittedQuestionId,
}) => {
  const handleOptionPress = (text: string, option: string) => {
    if (text === selectedOption?.text && option === selectedOption?.option) {
      onSelect(null, null, null, false, false);
    } else {
      onSelect(text, option, null, false, false);
    }
  };
  const dispatch = useDispatch();
  const proAssessmentAnsMap = {
    option1: 'option1',
    option2: 'option2',
    option3: 'option3',
    option4: 'option4',
  };
  const correctAnswer = isProAssessment
    ? proAssessmentAnsMap?.[data?.correct_choice]
    : data?.correctAnswer;
  return (
    <View style={cardStyles.card}>
      <Text
        style={[
          cardStyles.questionText,
          fontStyles?.Maison_600_16PX_21LH,
          { color: '#4B5F83' },
        ]}
      >
        {data?.question}
      </Text>
      {['option1', 'option2', 'option3', 'option4']
        .filter((v) => Object.keys(data).includes(v))
        .map((option, index) => {
          const styles =
            (correctAnswer === option && selectedOption?.option === option) ||
            correctAnswer === option
              ? cardStyles?.greenStyle
              : selectedOption?.option === option
              ? cardStyles?.redStyle
              : cardStyles?.whiteStyle;

          if (data?.[option])
            return (
              <TouchableOpacity
                key={index + '-option'}
                disabled={selectedOption?.isSubmitted}
                style={
                  selectedOption?.isSubmitted
                    ? styles
                    : selectedOption?.option === option
                    ? cardStyles?.selectedStyle
                    : cardStyles?.whiteStyle
                }
                onPress={() => handleOptionPress(data?.[option] || '', option)}
              >
                <Text
                  style={[
                    {
                      backgroundColor: '#F3F5F6',
                      textAlign: 'center',
                      borderRadius: RFValue(50),
                      height: RFValue(25),
                      paddingTop: RFValue(5),
                      width: RFValue(25),
                      color: '#4B5F83',
                    },
                    fontStyles?.Maison_500_13PX_15LH,
                  ]}
                >
                  {index === 1
                    ? 'b'
                    : index === 2
                    ? 'c'
                    : index === 3
                    ? 'd'
                    : 'a'}
                </Text>
                <Text
                  style={[
                    selectedOption?.text === data?.[option] &&
                      cardStyles.selectedOptionText,
                    {
                      ...fontStyles?.Maison_400_14PX_17LH,
                      textAlignVertical: 'center',
                      marginHorizontal: RFValue(5),
                      flex: 1,
                      color:
                        selectedOption?.option === option ? 'black' : '#797979',
                    },
                  ]}
                >
                  {data?.[option]}
                </Text>
              </TouchableOpacity>
            );
        })}

      {selectedOption?.isSubmitted && data?.explanation && (
        <Row style={{ flex: 1 }}>
          <Text style={{ flex: 1 }}>Explanation :-</Text>
          <Text style={{ flex: 2 }}> {data?.explanation}</Text>
        </Row>
      )}
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: RFValue(20),
    borderRadius: RFValue(10),
    marginBottom: RFValue(15),
    elevation: RFValue(2),
  },
  questionText: {
    fontSize: RFValue(18),
    marginBottom: RFValue(10),
  },
  whiteStyle: {
    padding: RFValue(7),
    borderWidth: RFValue(1),
    flexDirection: 'row',
    borderRadius: RFValue(8),
    marginBottom: RFValue(15),
    elevation: 2,
    borderColor: '#D9DBDB',
    backgroundColor: '#FFF',
  },
  selectedStyle: {
    padding: RFValue(7),
    borderWidth: RFValue(2),
    flexDirection: 'row',
    borderRadius: RFValue(8),
    marginBottom: RFValue(15),
    elevation: 2,
    borderColor: '#4B5F83',
    backgroundColor: '#FFF',
  },
  greenStyle: {
    padding: RFValue(7),
    borderWidth: RFValue(2),
    flexDirection: 'row',
    borderRadius: RFValue(8),
    marginBottom: RFValue(15),
    borderColor: '#30D03F',
    backgroundColor: '#30D03F80',
    elevation: 0,
  },
  redStyle: {
    padding: RFValue(7),
    borderWidth: RFValue(2),
    flexDirection: 'row',
    borderRadius: RFValue(8),
    marginBottom: RFValue(15),
    borderColor: '#FF6060',
    backgroundColor: '#FF606033',
    elevation: 0,
  },
  optionContainer: {
    padding: RFValue(7),
    borderWidth: RFValue(1),
    flexDirection: 'row',
    borderRadius: RFValue(8),
    marginBottom: RFValue(15),
    elevation: 2,
  },
  selectedOptionContainer: {
    backgroundColor: '#F3F5F6', // Light blue for selected state
    borderColor: '#4B5F83', // Matching border color
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});
