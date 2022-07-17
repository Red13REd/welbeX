import styled from "styled-components";
import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type InputPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onChangeError?: (value: boolean) => void
    onEnter?: () => void
    onFocusHandler?: () => void
    onBlurHandler?: () => void
    onBlurCheckName?: (name: React.FocusEvent<HTMLInputElement | HTMLSelectElement> ) => void
    error?: boolean
    textError?: string
    value?: string
    sign?: string
    labelValue?: string
    placeholder?: string
    width?: string
    select?: boolean
    showSelect?: boolean
    caretColor?: string
    name?: string
}

export const Input: React.FC<InputPropsType> = (props) => {

    const {
        onChangeText,
        labelValue,
        error,
        value,
        placeholder,
        onChangeError,
        width,
        onEnter,
        select,
        showSelect,
        onFocusHandler,
        onBlurHandler,
        caretColor,
        onBlurCheckName,
        name,
    } = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onBlurHandlerInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        onBlurCheckName && onBlurCheckName(e)
        onBlurHandler && onBlurHandler()
        if (!value) onChangeError && onChangeError(true)
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            (value)
                ? onEnter && onEnter()
                : onChangeError && onChangeError(true)
        }
    }

    return (
        <Wrapper
            error={error}>
            {select && showSelect
                ? ''
                : <Label
                    error={error}>
                    {labelValue}
                </Label>
            }
            <StyledInput
                name={name}
                type={'text'}
                width={width}
                value={value}
                error={error}
                select={select}
                caretColor={caretColor}
                placeholder={placeholder}
                onChange={onChangeHandler}
                onBlur={onBlurHandlerInput}
                onKeyDown={onKeyDownHandler}
                onFocus={onFocusHandler}
            />
        </Wrapper>
    )
}


export const StyledInput = styled.input<InputPropsType>`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 18px 15px;
  gap: 10px;

  position: absolute;
  width: ${props => props.width ? props.width : '180px'};
  height: 50px;
  left: 0;
  top: 5px;

  background: #FFFFFF;
  border: 2px solid ${props => props.error ? '#f35454' : '#E3E3E3'};
  border-radius: 8px;

  cursor: ${props => props.select ? 'pointer' : ''};
  caret-color: ${props => props.caretColor ? props.caretColor : ''};

  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0.25px;

  &::placeholder {

    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0.25px;

    color: ${props => props.select ? '#050505' : '#111111'};
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  &:focus {
    outline: none !important;
    border: 2px solid ${props => props.error ? '#f35454' : '#0086A8'}
  }

`

const Wrapper = styled.div<InputPropsType>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 5px;
  margin: 5px 0;

  width: 380px;
  height: 55px;

  &:after {
    content: '${props =>
            props.error ? 'Поле не должно содержать буквы' : ''}';
    z-index: 1;
    position: absolute;
    font-size: 11px;
    font-family: 'Open Sans', sans-serif;
    bottom: -18px;
    left: 15px;
    color: #f35454;
  }

  &:focus-within div {
    color: ${props => props.error ? '#f35454' : '#0086A8'} !important;
  }
`

const Label = styled.div<InputPropsType>`
  display: flex;
  align-items: flex-start;
  margin: 0 0 0 10px;
  padding: 0 4px;
  z-index: 1;
  position: absolute;
  left: 0;
  top: -7px;
  white-space: nowrap;

  height: 12px;
  font-family: 'SF UI Display', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.25px;

  color: ${props => props.error ? '#f35454' : '#1a1919'};
`

