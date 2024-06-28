import { useEffect, useRef, useState } from "react";
import PlusIcon from "core/assets/icons/plusIcon/plus.svg";
import { styled } from "styled-components";

const ImageInputWrap = styled.section`
  display: flex;
  gap: 24px;
`;

const ImageInputBtn = styled.button`
  width: 282px;
  height: 282px;
  border: none;
  border-radius: 12px;
  background-color: #f3f4f6;
  cursor: pointer;
`;

const ImageBtnIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const ImageBtnIconTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #9ca3af;
`;

const PreviewImage = styled.img`
  width: 282px;
  height: 282px;
  border: none;
  border-radius: 12px;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

interface AddItemImageInputProps {
  name: string;
  value: File[] | null;
  onChange: (name: string, value: File[] | null) => void;
}

const AddItemImageInput = ({
  name,
  value,
  onChange,
}: AddItemImageInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = (e.target as HTMLInputElement).files![0];
    onChange(name, [nextValue]);
  };

  useEffect(() => {
    if (!value || value.length <= 0) return;
    const nextPreview = URL.createObjectURL(value[0]);
    setPreview(nextPreview);
    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <ImageInputWrap>
      <ImageInputBtn type="button" onClick={handleClick}>
        <ImageBtnIcon src={PlusIcon} alt="이미지 추가 아이콘" />
        <ImageBtnIconTitle>이미지 등록</ImageBtnIconTitle>
      </ImageInputBtn>

      <ImageInput
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept="image/png, image/jpg, image/jpeg"
      />
      {preview && (
        <PreviewImage src={preview ?? undefined} alt="이미지 미리보기" />
      )}
    </ImageInputWrap>
  );
};

export default AddItemImageInput;
