import React, { useRef, useState, useEffect } from 'react'
import { Plus } from 'react-feather'
import { UseFormRegisterReturn } from 'react-hook-form'

import { Box, Button, Icon, Image, InputGroup } from '@chakra-ui/react'

interface IFileUpload {
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
  disabled?: boolean
  defaultValue?: File[]
}

const FileUpload: React.FC<IFileUpload> = ({
  register,
  accept,
  disabled,
  defaultValue = [],
  multiple
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imageRef = useRef<File[]>(defaultValue)

  const { ref, onChange, ...rest } = register

  const [files, setFiles] = useState<File[]>(defaultValue)

  useEffect(() => {
    if (defaultValue.length !== 0) {
      setFiles(defaultValue)
      imageRef.current = defaultValue

      if (inputRef.current) {
        const onChangeEvent = {
          type: 'change',
          target: inputRef.current
        }

        const clipBoard =
          new ClipboardEvent('').clipboardData || new DataTransfer()

        for (let i = 0; i < defaultValue.length; i++) {
          clipBoard.items.add(defaultValue[i])
        }

        onChangeEvent.target.files = clipBoard.files

        onChange(onChangeEvent)
      }
    }
  }, [defaultValue])

  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log('CLICKED')

    if (inputRef.current) {
      const [, fileName] = e.currentTarget.id.split('$')
      const storedFiles = files
      const filteredArray = storedFiles.filter(
        element => element.name !== fileName
      )

      imageRef.current = filteredArray
      setFiles(filteredArray)

      const clipBoard =
        new ClipboardEvent('').clipboardData || new DataTransfer()

      for (let i = 0; i < imageRef.current.length; i++) {
        clipBoard.items.add(imageRef.current[i] as File)
      }
      const onChangeEvent = {
        type: 'change',
        target: inputRef.current
      }

      onChangeEvent.target.files = clipBoard.files

      onChange(onChangeEvent)
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    if (event.target.files.length === 0) {
      return
    }

    const clipBoard = new ClipboardEvent('').clipboardData || new DataTransfer()

    if (imageRef.current) {
      for (let i = 0; i < imageRef.current.length; i++) {
        clipBoard.items.add(imageRef.current[i] as File)
      }
    }

    for (let i = 0; i < event.target.files.length; i++) {
      clipBoard.items.add(event.target.files[i])
      imageRef.current.push(event.target.files[i])
    }

    const eventWithItems = event

    eventWithItems.target.files = clipBoard.files

    onChange(eventWithItems)

    setFiles(Array.from(clipBoard.files))
  }

  return (
    <InputGroup display="flex" flexWrap="wrap">
      <input
        type="file"
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={e => {
          ref(e)
          inputRef.current = e
        }}
        onChange={onChangeHandler}
      />
      {files.map(file => {
        const uniqueId = `${Math.floor(Math.random() * 10000000000)}$${
          file.name
        }`

        return (
          <Box
            key={uniqueId}
            id={uniqueId}
            w="36"
            h="24"
            bg="#dfdede"
            borderRadius="md"
            mr="3"
            mb="4"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={disabled ? undefined : handleImageClick}
          >
            <Image
              src={URL.createObjectURL(file)}
              w="full"
              h="full"
              objectFit="contain"
            />
          </Box>
        )
      })}
      <Button
        onClick={handleClick}
        disabled={disabled}
        bg="#dfdede"
        w="36"
        h="24"
        _focus={{
          boxShadow: 'none',
          outline: 0,
          border: 0
        }}
        _hover={{
          backgroundColor: '#c2c2c2'
        }}
      >
        <Icon as={Plus} boxSize="8" />
      </Button>
    </InputGroup>
  )
}

export default FileUpload
