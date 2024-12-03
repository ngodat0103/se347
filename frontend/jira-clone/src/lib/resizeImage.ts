export function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
    
        reader.onload = (event) => {
          if (typeof event.target?.result === 'string') {
            img.src = event.target.result;
          } else {
            reject(new Error("FileReader result is not a string"));
          }
        };
    
        reader.onerror = (error) => {
          reject(error);
        };
    
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
    
          if (!ctx) {
            reject(new Error("Canvas context is not available"));
            return;
          }
    
          // Tính tỷ lệ để giữ nguyên tỉ lệ khung hình
          let width = img.width;
          let height = img.height;
    
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
    
          canvas.width = width;
          canvas.height = height;
    
          // Vẽ ảnh lên canvas
          ctx.drawImage(img, 0, 0, width, height);
    
          // Chuyển canvas thành Blob
          canvas.toBlob(async (blob) => {
            if (blob) {
              // Kiểm tra kích thước ảnh
              if (blob.size > 2 * 1024 * 1024) {
                // Giảm kích thước thêm nếu ảnh vẫn lớn hơn 2MB
                resolve(
                  await resizeImage(
                    new File([blob], file.name, { type: file.type }),
                    maxWidth * 0.9,
                    maxHeight * 0.9
                  )
                );
              } else {
                resolve(new File([blob], file.name, { type: file.type }));
              }
            } else {
              reject(new Error("Blob is null"));
            }
          }, file.type);
        };
    
        img.onerror = (error) => {
          reject(error);
        };
    
        reader.readAsDataURL(file);
      });
    }