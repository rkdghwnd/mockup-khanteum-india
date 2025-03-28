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
      buffer: "buffer/",
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  server: {
    port: 3000, // Change port number to 3000
  },
});

// Dynamically load AWS SDK
// let s3Client: any = null;

// Initialize S3 client (only when needed)
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
//       console.error("Failed to load AWS SDK", err);
//     }
//   }
//   return s3Client;
// };
