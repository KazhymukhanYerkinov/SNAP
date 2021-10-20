import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';

// @material-ui
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Autocomplete, Select, MenuItem, FormHelperText } from '@mui/material';

// @components
import { Button } from '../index';

// @redux
import { actions, createUser, editUser } from '../../redux/users-store/users-reducer';

// @shared
import { UserType } from '../../shared/types';
import { addUserValidation } from '../../shared/validations';

import { ModalProps } from './Modal.props';
import 'react-phone-input-2/lib/style.css';
import styles from './Modal.module.css';




const top100Films = [
  { id: 1, name: 'Менеджер' },
  { id: 2, name: 'Стажер' },
  { id: 3, name: 'Директор' },
]

const initialValues = {
  id: 0,
  placeWork: '',
  email: '',
  name: '',
  surname: '',
  middlename: '',
  password: '',
  role: [],
  phone: '',
  medBook: '',
  numberMedBook: '',
  dateMedBook: '2000-10-24'
}

export const Modal = ({ user, modal, deactivateModal }: ModalProps) => {

  const dispatch = useDispatch();
  const [isMedBook, setIsMedBook] = React.useState(false);
  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(addUserValidation), defaultValues: {...user}, });

  const submit = (formData: UserType) => {
    deactivateModal();
    if (user.name) {
      dispatch(editUser(user.id, formData));
    }
    else {
      dispatch(createUser(formData));
    }
  }


  const close = () => {
    dispatch(actions.setUser(initialValues));
    reset(initialValues);
    deactivateModal();
  }

  React.useEffect(() => {
    if (user.name) {
      reset(user);
      if (user.medBook === 'Yes') {
        setIsMedBook(true);
      }
    }
  }, [user]);
  

  return (
    <div className={cn(styles.modal, { [styles.activate]: modal })}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <div> Добавление пользователя </div>
          <CloseIcon onClick={close} />
        </div>

        <form onSubmit={handleSubmit(submit)}>
          <Controller
            name='placeWork'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size='small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                placeholder='Место работы'
                className={styles.field}
              />
            )} />

          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size='small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='E-mail'
                helperText={error ? error.message : null}
                className={styles.field} />
            )} />

          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size='small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Имя'
                helperText={error ? error.message : null}
                className={styles.field} />
            )}
          />

          <Controller
            name='surname'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size='small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Фамилия'
                helperText={error ? error.message : null}
                className={styles.field} />
            )}
          />

          <Controller
            name='middlename'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size='small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Отчество'
                helperText={error ? error.message : null}
                className={styles.field} />
            )}
          />

          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type='password'
                size='small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Пароль'
                helperText={error ? error.message : null}
                className={styles.field} />
            )}
          />

          <Controller
            name='role'
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                multiple
                options={top100Films}
                defaultValue={[]}
                getOptionLabel={(option) => option.name}
                value={value}
                onChange={(e, options) => onChange(options)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    size='small'
                    className={styles.field}
                    placeholder='Должность:'
                    error={!!error}
                    helperText={error ? error.message : null}
                  />)}
              />)}
          />

          <Controller
            name='phone'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <React.Fragment>
                <PhoneInput
                  placeholder='Телефон'
                  country='kz'
                  onlyCountries={['kz', 'us']}
                  value={value}
                  onChange={onChange}
                  inputClass={cn(styles.phone, { [styles.error]: !!error })}
                />
                {error && <span className={styles.error}> {error.message} </span>}
              </React.Fragment>
            )}
          />
          
          <Controller
            name='medBook'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <React.Fragment>
              <Select
                fullWidth
                size='small'
                value={value}
                onChange={(e) => {
                  if (e.target.value === 'Yes') {
                    setIsMedBook(true);
                  }
                  else {
                    setIsMedBook(false);
                  }
                  onChange(e);
                }}
                className={styles.select}
                error = {!!error}>

                <MenuItem value=''> Мед.книжка </MenuItem>
                <MenuItem value='No'> Нет </MenuItem>
                <MenuItem value='Yes'> Да </MenuItem>

              </Select>
              {error && <FormHelperText error = {!!error}> {error.message} </FormHelperText>}
              </React.Fragment>
            )}

          />

          <Controller
            name='numberMedBook'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size='small'
                disabled = {!isMedBook}
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Номер мед.книжки'
                helperText={error ? error.message : null}
                className={styles.field} />
            )}
          />

          <Controller
            name='dateMedBook'
            control={control}
            defaultValue='2000-10-24'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size='small'
                type = 'date'
                disabled = {!isMedBook}
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Дата выдачи мед.книжка'
                helperText={error ? error.message : null}
                className={styles.field} />
            )}
          />

          <Button type='submit' appearance='primary'> Добавить </Button>
        </form>



      </div>
    </div>
  )
}
