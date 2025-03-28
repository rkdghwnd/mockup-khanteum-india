import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스 이름을 병합하기 위한 유틸리티 함수
 * clsx와 tailwind-merge를 함께 사용하여 충돌 없이 클래스 결합
 */
export function clsxm(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
