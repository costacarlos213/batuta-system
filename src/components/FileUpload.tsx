import React, { useRef, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { Box, Image, InputGroup } from '@chakra-ui/react'

interface IFileUpload {
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
}

const FileUpload: React.FC<IFileUpload> = ({
  register,
  accept,
  children,
  multiple
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imageRef = useRef<File[]>([])

  const { ref, onChange, ...rest } = register

  const [files, setFiles] = useState<File[]>([])

  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const fileName = e.currentTarget.id
    const storedFiles = files
    const filteredArray = storedFiles.filter(
      element => element.name !== fileName
    )
    setFiles(filteredArray)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
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
    <InputGroup onClick={handleClick} display="flex" flexWrap="wrap">
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
      {files.map(file => (
        <Box
          key={file.name}
          id={file.name}
          w="36"
          h="24"
          bg="#dfdede"
          borderRadius="md"
          mr="3"
          mb="4"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={handleImageClick}
        >
          <Image
            src={URL.createObjectURL(file)}
            w="full"
            h="full"
            objectFit="contain"
          />
        </Box>
      ))}
      {children}
    </InputGroup>
  )
}

export default FileUpload
