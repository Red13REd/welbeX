import React, {DetailedHTMLProps, SelectHTMLAttributes, useState} from 'react';
import styled from "styled-components";
import icon from "../assets/image/icon.png"
import {Input} from "./Input";

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
    onChangeError?: (value: boolean) => void
    value?: string
    labelValue?: string
    placeholder?: string
    name?: string
    color?: string
    error?: boolean
    disabled?: boolean
    onBlurCheckName?: (name: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const Select: React.FC<SelectPropsType> = (props) => {

    const {
        options,
        value,
        onChangeOption,
        onBlurCheckName,
        onChangeError,
        error,
        labelValue,
        placeholder,
        name,
    } = props


    const [show, setShow] = useState<boolean>(true)

    const onSelectHandler = () => {
        setShow(!show)
    }

    const onClickHandlerOptions = (city: string) => {
        onChangeOption && onChangeOption(city)
        setShow(true)
        onChangeError && onChangeError(false)
    }

    const onClickModalHandler = () => {
        setShow(true)
    }

    return (
        <div style={{'position': 'relative','width':'380px'}}>
            <Input
                name={name}
                value={value}
                labelValue={labelValue}
                placeholder={placeholder}
                error={error}
                width='380px'
                select={true}
                showSelect={show}
                caretColor='#FFFFFF'
                onFocusHandler={onSelectHandler}
                onBlurCheckName={onBlurCheckName}
            />
            <Icon show={show}/>
            {!show ?
                <>
                    <Ul onBlur={onSelectHandler}>
                        {options?.map((m, i) => {
                            return (
                                <StyledOption
                                    key={m.key ? m.key : i}
                                    onClick={() => onClickHandlerOptions(m.name ? m.name : m)}
                                >
                                    {m.name ? m.name : m}
                                </StyledOption>
                            )
                        })}
                    </Ul>
                    <Modal onClick={onClickModalHandler}/>
                </>
                : ''}

        </div>
    );
};

const Ul = styled.ul`
  margin: 0;
  top: 60px;
  left: 0;
  z-index: 4;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2px;

  width: 135px;

  box-shadow: 0 5px 20px rgba(53, 50, 56, 0.14);
  border-radius: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;
`

const StyledOption = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
  gap: 10px;
  cursor: pointer;
  width: 131px;
  height: 35px;
  border-bottom: 2px solid #E3E3E3;
  z-index: 4;

  background: #FAFAFA;

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;

  &:hover {
    background: #d3d2d2;
  }

`

export const Icon = styled.div<IconType>`
  position: absolute;
  width: 11px;
  height: 6px;
  z-index: 1;
  bottom: ${props => props.bottom ? props.bottom : '60px'};
  right: ${props => props.right ? props.right : '10px;'};
  transform: ${props => props.show ? '' : 'rotateX(180deg)'};
  cursor: pointer;
  pointer-events: ${props => props.pointerEvents ? props.pointerEvents : 'none;'};
  background-image: url('${icon}');
  background-repeat: no-repeat;
`

const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  zIndex: 3;
`

type IconType = {
    bottom?: string
    right?: string
    pointerEvents?: string
    show: boolean
}