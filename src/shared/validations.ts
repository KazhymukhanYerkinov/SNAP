import * as Yup from 'yup';


const digitsOnly = (value: any) => /^\d+$/.test(value);

export const addUserValidation = Yup.object().shape({
  email: Yup.string().email('Неправильный электронный адрес'),
  name: Yup.string().required('Поле, обязательное для заполнения'),
  surname: Yup.string().required('Поле, обязательное для заполнения'),
  password: Yup.string()
    .required('Поле, обязательное для заполнения')
    .min(4, 'Минимальная длина 4 символов'),
  role: Yup.array().min(1, 'Пожалуйста выберите'),
  phone: Yup.string()
    .required('Поле, обязательное для заполнения')
    .min(11, 'Минимальная длина 11 символов'),
  medBook: Yup.string().required('Пожалуйста выберите'),
  numberMedBook: Yup.string()
    .when('medBook', {
      is: (val: string) => val === 'Yes',
      then: Yup.string()
        .required('Поле, обязательное для заполнения')
        .test('Digits only', 'В поле должны быть только цифры', digitsOnly),
      otherwise: Yup.string().notRequired()
    }),
  dateMedBook: Yup.string()
    .when('medBook', {
      is: (val: string) => val === 'Yes',
      then: Yup.string().required('Поле, обязательное для заполнения'),
      otherwise: Yup.string().notRequired()
    }),
});
