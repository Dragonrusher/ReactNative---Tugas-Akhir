import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, Header, Select, TextInput} from '../../components';
import {setLoading, signUpAction} from '../../redux/action';
import {useForm} from '../../utils';

const SignUpAddress = ({navigation}) => {
  const [form, setForm] = useForm({
    phoneNumber: '',
    address: '',
    houseNumber: '',
    city: 'Padang',
  });

  const dispatch = useDispatch();
  const {registerReducer, photoReducer} = useSelector(state => state);

  const onSubmit = () => {
    console.log('form :', form);
    const data = {
      ...form,
      ...registerReducer,
    };
    console.log('data register: ', data);
    dispatch(setLoading(true));
    dispatch(signUpAction(data, photoReducer, navigation));

    // axios
    //   .post('http://foodmarket-backend.buildwithangga.id/api/register', data)
    //   .then(res => {
    //     console.log('data success :', res.data);

    //     if (photoReducer.isUploadPhoto) {
    //       const photoForUpload = new FormData();
    //       photoForUpload.append('file', photoReducer);

    //       axios
    //         .post(
    //           'http://foodmarket-backend.buildwithangga.id/api/user/photo',
    //           photoForUpload,
    //           {
    //             headers: {
    //               Authorization: `${res.data.data.token_type} ${res.data.data.access_token}`,
    //               'Content-Type': 'multipart/form-data',
    //             },
    //           },
    //         )
    //         .then(resUpload => {
    //           console.log('upload photo success :', resUpload);
    //         })
    //         // eslint-disable-next-line handle-callback-err
    //         .catch(err => {
    //           showMessage('Upload photo failed');
    //         });
    //     }

    //     dispatch(setLoading(false));
    //     showMessage('Register Success', 'success');
    //     navigation.replace('SuccessSignUp');
    //   })
    //   .catch(err => {
    //     // console.log('sign up error :', err.response.data.message);
    //     dispatch(setLoading(false));

    //     showMessage(err?.response?.data?.message);
    //   });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.page}>
        <Header
          title="Adress"
          subTitle="Make Sure It's Valid"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Phono No."
            placeholder="Type Your Phone Number"
            value={form.phoneNumber}
            onChangeText={value => setForm('phoneNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type Your Address"
            value={form.address}
            onChangeText={value => setForm('address', value)}
          />
          <Gap height={16} />
          <TextInput
            label="House No."
            placeholder="Type Your House Number"
            value={form.houseNumber}
            onChangeText={value => setForm('houseNumber', value)}
          />
          <Gap height={16} />
          <Select
            label="City"
            value={form.city}
            onSelectChange={value => setForm('city', value)}
          />
          <Gap height={24} />
          <Button text="Sign Up Now" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpAddress;

const styles = StyleSheet.create({
  page: {flex: 1},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
