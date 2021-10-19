import React from 'react';
import cn from 'classnames';
import PhoneInput from 'react-phone-input-2';
import { TextField, Autocomplete, Select, MenuItem } from '@mui/material';
import { Button } from '../index';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from '@mui/icons-material/Close';
import styles from './Modal.module.css';
import { ModalProps } from './Modal.props';
import { addUserValidation } from '../../shared/validations';
import 'react-phone-input-2/lib/style.css'


const top100Films = [
  { id: 1, name: 'Менеджер' },
  { id: 2, name: 'Стажер' },
  { id: 3, name: 'Директор' },
]



export const Modal = ({ modal, deactivateModal }: ModalProps) => {

  const { control, handleSubmit } = useForm({ resolver: yupResolver(addUserValidation) });

  const submit = (formData: any) => {
    console.log(formData);
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
                size = 'small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                placeholder='Место работы'
                className = {styles.field}
              />
            )} />

          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size = 'small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='E-mail'
                helperText={error ? error.message : null}
                className = {styles.field} />
            )} />

          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size = 'small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Имя'
                helperText={error ? error.message : null} 
                className = {styles.field}/>
            )}
          />

          <Controller
            name='surname'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size = 'small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Фамилия'
                helperText={error ? error.message : null} 
                className = {styles.field}/>
            )}
          />

          <Controller
            name='middlename'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size = 'small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Отчество'
                helperText={error ? error.message : null} 
                className = {styles.field} />
            )}
          />

          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type = 'password'
                size = 'small'
                fullWidth
                variant='outlined'
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder='Пароль'
                helperText={error ? error.message : null} 
                className = {styles.field} />
            )}
          />

          <Controller 
            name = 'role'
            control = {control}
            defaultValue = {[]}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete 
                multiple
                options = {top100Films}
                defaultValue = {[]}
                getOptionLabel={(option) => option.name}
                value = {value}
                onChange = {(e, options) => onChange(options)}
                renderInput = {(params) => (
                  <TextField 
                    {...params}
                    variant = 'outlined'
                    size = 'small'
                    className = {styles.field}
                    placeholder = 'Должность:'
                    error={!!error}
                    helperText={error ? error.message : null} 
                  />)}
              />)}
            />

          <Controller 
            name = 'phone'
            control = {control}
            defaultValue = ''
            render={({ field: { onChange, value }, fieldState: { error }}) => (
              <React.Fragment>
                <PhoneInput 
                  placeholder = 'Телефон'
                  country = 'kz'
                  onlyCountries = {['kz', 'us']}
                  value = {value}
                  onChange = {onChange}
                  inputClass = {cn(styles.phone, {[styles.error]: !!error})}
                />
                {error && <span className = {styles.error}> {error.message} </span>}
              </React.Fragment>
            )}
          />

          <Controller 
            name = 'medBook'
            control = {control}
            defaultValue = 'N1'
            render = {({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                fullWidth
                size = 'small'
                value = {value}
                onChange = {onChange}
                className = {styles.select}>
                
                <MenuItem value = 'N1'> Мед.книжка </MenuItem>
                <MenuItem value = 'No'> Нет </MenuItem>
                <MenuItem value = 'Yes'> Да </MenuItem>

              </Select>
            )}
          />

          <Button type='submit' appearance='primary'> Добавить </Button>
        </form>



      </div>
    </div>
  )
}
