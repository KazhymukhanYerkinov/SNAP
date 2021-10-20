import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import PhoneInput from 'react-phone-input-2';
import { TextField, Autocomplete, Select, MenuItem, FormHelperText } from '@mui/material';
import { Button } from '../index';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from '@mui/icons-material/Close';
import styles from './Modal.module.css';
import { ModalProps } from './Modal.props';
import { addUserValidation } from '../../shared/validations';
import 'react-phone-input-2/lib/style.css'
import { UserType } from '../../shared/types';
import { createUser } from '../../redux/users-store/users-reducer';


const top100Films = [
  { id: 1, name: 'Менеджер' },
  { id: 2, name: 'Стажер' },
  { id: 3, name: 'Директор' },
]



export const Modal = ({ modal, deactivateModal }: ModalProps) => {

  const dispatch = useDispatch();
  const [isMedBook, setIsMedBook] = React.useState(false);
  const { control, handleSubmit } = useForm({ resolver: yupResolver(addUserValidation) });

  const submit = (formData: UserType) => {
    dispatch(createUser(formData));
  }


  return (
    <div className={cn(styles.modal, { [styles.activate]: modal })}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <div> Добавление пользователя </div>
          <CloseIcon onClick={deactivateModal} />
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
