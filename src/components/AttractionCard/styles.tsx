import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 15,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 12,
    marginLeft: 6,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '300',
    color: 'rgba(0,0,0,0.5)',
  },
  icon: {
    width: 8,
    height: 8,
    marginRight: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 6,
    marginTop: 2,
  },
});

export default styles;
