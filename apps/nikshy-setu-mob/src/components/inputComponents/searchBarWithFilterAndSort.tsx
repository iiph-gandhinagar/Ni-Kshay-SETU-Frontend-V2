import { FilterSvg, SearchIcon } from '@nikshay-setu-v3-monorepo/assets';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Row } from '../commonComponents/row_column';

interface SearchBarWithFilterAndSortProps {
  onSearchPress?: (text: string) => void;
  onFilterPress?: () => void;
  onSortChange?: (sortOrder: 'asc' | 'desc' | null) => void;
  sortOrder: 'asc' | 'desc' | null;
  navigation: any; // Replace with proper navigation type if using TypeScript
}

const SearchBarWithFilterAndSort: React.FC<SearchBarWithFilterAndSortProps> = ({
  onSearchPress,
  onFilterPress,
  onSortChange,
  sortOrder,
  navigation,
}) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSortChange = () => {
    let newOrder: 'asc' | 'desc' | null = null;
    if (sortOrder === null) {
      newOrder = 'asc';
    } else if (sortOrder === 'asc') {
      newOrder = 'desc';
    } else if (sortOrder === 'desc') {
      newOrder = null;
    }
    onSortChange?.(newOrder);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    // onSearchPress?.(text); // Notify parent of the search query
  };

  return (
    <Row style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.searchContainer}
        onPress={() => {
          navigation.navigate('referralHealthFilter');
        }}
      >
        <Row style={styles.inputRow}>
          <SearchIcon style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder='Search'
            value={searchText}
            editable={false}
            onTouchStart={() => {
              navigation.navigate('referralHealthFilter');
            }}
            onChangeText={handleSearch}
            returnKeyType='search'
            onSubmitEditing={() => onSearchPress?.(searchText)}
          />
        </Row>
      </TouchableOpacity>
      <Row style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('referralHealthFilter')}
          style={styles.iconContainer}
        >
          <FilterSvg />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={handleSortChange}
          style={[
            styles.sortButton,
            // {
            //   backgroundColor:,
            // },
          ]}
        >
          <SortingArrow fill={sortOrder
            ? sortOrder === 'asc'
              ? 'green'
              : 'red'
            : 'black'} />
        </TouchableOpacity> */}
      </Row>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RFValue(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: RFValue(15),
    backgroundColor: '#F4F4F4',
    paddingHorizontal: RFValue(20),
  },
  searchContainer: {
    flex: 1,
  },
  inputRow: {
    flex: 1,
    alignItems: 'center',
  },
  searchIcon: {
    marginHorizontal: RFValue(5),
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: RFValue(14),
    color: '#333',
  },
  actionContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    padding: RFValue(3),
  },
  sortButton: {
    marginStart: RFValue(10),
    padding: RFValue(3),
    borderRadius: RFValue(10),
  },
});

export default SearchBarWithFilterAndSort;
