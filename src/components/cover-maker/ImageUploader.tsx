"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';

interface ImageUploaderProps {
  canvasId: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ canvasId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const uploadApiUrl = process.env.NEXT_PUBLIC_APP_UPLOAD_API_URL;

  const uploadImage = async () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append('image', blob, 'AntCard-Cover.webp');

      try {
        const response = await fetch(uploadApiUrl!, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.result === 'success') {
          showUploadResult(data.url, true);
        } else {
          showUploadResult('图片上传失败: ' + data.message, false);
        }
      } catch (error) {
        console.error('上传图片时出错:', error);
        showUploadResult('图片上传失败: ' + (error as Error).message, false);
      }
    }, 'image/webp');
  };

  const showUploadResult = (message: string, success: boolean) => {
    setIsSuccess(success);
    if (success) {
      setSuccessMessage('图片上传成功！链接已复制到剪切板。');
      setErrorMessage('');
      setUploadedImageUrl(message);
    } else {
      setSuccessMessage('');
      setErrorMessage(message);
      setUploadedImageUrl('');
    }
    setShowPopup(true);

    // Copy to clipboard
    navigator.clipboard.writeText(message).then(() => {
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    });
  };

  if (!uploadApiUrl) {
    return null;
  }

  return (
    <>
      <Button
        onClick={uploadImage}
        className="flex-1"
        variant="secondary"
        size="sm"
      >
        获取外链
      </Button>

      {/* Upload Result Popup */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 z-50 ${
          showPopup
            ? 'opacity-100 visible translate-y-3'
            : 'opacity-0 invisible translate-y-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          {isSuccess ? (
            <>
              <p className="text-green-600 dark:text-green-400 mb-2">{successMessage}</p>
              <a
                href={uploadedImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors break-all"
              >
                {uploadedImageUrl}
              </a>
            </>
          ) : (
            <p className="text-red-500 dark:text-red-400">{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};