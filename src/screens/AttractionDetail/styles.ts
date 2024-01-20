import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    margin: 32,
  },
  mainImage: {
    width: '100%',
    height: height / 2,
  },
  innerImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    padding: 8,
    borderRadius: 12,
  },
  miniImage: {
    position: 'relative',
    borderRadius: 8,
    width: 46,
    height: 42,
  },
  moreImages: {
    position: 'absolute',
    borderRadius: 8,
    width: '100%',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.38)',
    top: 0,
    bottom: 0,
    textAlign: 'center',
    paddingTop: 6,
  },
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 30,
  },
  title: {
    color: '#000',
  },
  city: {
    fontSize: 20,
    fontWeight: '400',
  },
  price: {
    color: '#000',
  },
});

export default styles;
