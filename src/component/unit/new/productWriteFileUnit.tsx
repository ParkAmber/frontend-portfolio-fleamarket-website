import { useState } from "react";
import { UploadImage } from "../../../commons/01/Uploads01.styles";

export default function FileItem(props: any): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = (): void => {
    setIsEdit(true);
  };
  return (
    <>
      <div>
        {props.isUploadClicked ? (
          <UploadImage
            onClick={props.onClickUpload}
            // src={`https://storage.googleapis.com/${el}`}
            id={String(props.index)}
            src={
              props.isUploadClicked
                ? props.imageUrls[props.index]
                : `https://storage.googleapis.com/${
                    props.fetchImages[props.index]
                  }`
            }
          />
        ) : (
          <input type='text' />
        )}
      </div>
    </>
  );
}
