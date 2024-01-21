import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 40,
    borderRadius: 10,
    width: width - 40,
    marginHorizontal: 20,
    padding: 8,
    gap: 14,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  backIcon: {
    width: 40,
    height: 40,
  },
});

export default styles;
