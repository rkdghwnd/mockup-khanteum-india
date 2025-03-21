import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    commonjsOptions: {
      include: [/aws-sdk/, /node_modules/],
    },
  },
  server: {
    port: 3000, // 포트번호 3000으로 변경
  },
});

// 동적으로 AWS SDK 불러오기
// let s3Client: any = null;

// S3 클라이언트 초기화 (필요할 때만)
// const getS3Client = async () => {
//   if (process.env.NODE_ENV === "production" && !s3Client) {
//     try {
//       const AWS = await import("aws-sdk");
//       s3Client = new AWS.S3({
//         accessKeyId: "YOUR_ACCESS_KEY_ID",
//         secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
//         region: "ap-northeast-2",
//       });
//     } catch (err) {
//       console.error("AWS SDK 로딩 실패", err);
//     }
//   }
//   return s3Client;
// };
