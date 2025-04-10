const LockIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
    >
      <rect width="18" height="18" fill="url(#pattern0_2048_38024)" />
      <defs>
        <pattern id="pattern0_2048_38024" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_2048_38024" transform="translate(0.1125) scale(0.0125)" />
        </pattern>
        <image
          id="image0_2048_38024"
          width="62"
          height="80"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAABQCAYAAABBP8ZuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDc2Njk0NTY4NkUzMTFFQTk3NDVGRUMyRDI1QkU3M0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDc2Njk0NTc4NkUzMTFFQTk3NDVGRUMyRDI1QkU3M0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NzY2OTQ1NDg2RTMxMUVBOTc0NUZFQzJEMjVCRTczQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NzY2OTQ1NTg2RTMxMUVBOTc0NUZFQzJEMjVCRTczQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiGEKwsAAAT+SURBVHja7JxfiBVVHMfnbmv4t3yRUkopcDV9ESVNKSNBUINMApEtFG3VEjIlSB+iRV9E7aHWBxf/vpQrWLaJ/8DYyL9wl9An/4Gaf5As0LJS10Wv36/3e/LseLnb9Tpn7syeA997Zs6cM2c+8zsz85tzztxMLpcLumKoCrpoqOZPJpOJtJK1G7LDEE2CXoOGQgOhntp8A7oAnYQOQns+rBt9PMrjYSvP3P+JABywTyKqhT6GRpRY/Bj0FbQFJ+F2YsAB/SaiBuhFK7kdykK/QOegP5XeF3oBGgWNhrpZZc5CCwG/q6LBAdxLwHNC1mPadwC43kn5pxC9Q9hQK9mkE/BvxYHjoPvx+pTlGM6zmeNgf3jE/U1Vcx+kJLaUydjfHxUDLuifoZeUtBWah4P8u8z99kG0DpqhpBPQ6+XCk7nqMd3Emi3o5byplQvNoH3Uap+B6mhWneU/zsoMK6BxWl6Fg61/nDci7I8eVj1guyP+VHWxzk9ic2BwMLwLL9bqXmhphI/fpaqDYbHqjs1z+4L+D/QXNFvWiSRo37NVF+tcHQs4zvh4eWIMy3Bgv0XtZqoOc72P1zE4t/hcxdeg9Q7d7HWqk6HOKTjONL2rt7XaBEv844padTVpdZqOxZnFx0C9tfx9DC9XzYp7y811Bj5S8V3ocAzgh+iHaHmUS/Aa45ai6d1wTa06f9XqYJfgTyu+EmNfwhXr7c4ZeB/FbTGCt4WOxXc9eXAP7sE9uAf34B7cg3twD+7Bkxs6jKSs3ZAdgmgR9Gonbz0cOeEw760YX02fgdjXznfzYiMrHJTg8POXeI8/xYQOQ0iAfi/ID851S6mROVo7B/Bf/wfeuLGV/VbsQnoC4ogkx74upQT4uSA/9saR3DvQuA/efzlrhpA+EzTHrMfirJxMk6nRmjnwcSTI99aQ9S1zc5uguDFt0AxiarRZDXgvxadTfCM/bbOGH2dpnvuV889xD+7Bu06ojqNSPFcHIHpeqxfxuLmcWnDA0rfn/DXOaqgJbeOjZjPU4GosrsoRNIeV+YKwIgytUKNtp5D3lVSAC+Qn+cwMnATIKVzDpVqlGb+6xQV8tYPmvQ3qAd2E3kVTDk8k4EzlJuSdhvgb5d3GV+Qom33UFl9oWXpmAWjbn+a2mZblFyW5qc9S3AKwb//HywTztJgTlUhwzW8dqtWmEopuUTxE+0icxZ+1lk+UUM7OOyDpnlv3R8ybSyI4v0K4q+WxJZQzjzKWPZs4cE3EO6DVuZp93Nl9gXnmafVAlBMHo27qDYr51dEagGWKQGeUf1CobPLAYbHtiHZrlfNOtwKwfwFoprFn18yP3a2yifbV6ZJmtTydli+QZ422MbSqTLJ9dViO88sXWEk7CmSz0xaoTCo6IqZYd+qdBbYz7Y6WJ6epB8ZM8d4Pa14t0CqYtj+UN/Gvpbyjm9nOzUWymm0jVSbxFp9aAK4YeLhMYsHNNXsMTfp8kZsgvyg+6uo6r3Z4OY1AE85VikFcWJwjle0l5G9XmWRbHE34R1ian0ZylkVnH7GyRRxEmTNpaOqBQM4EFRT8EJIH9+AePNXgbVZPSVrDQJvVgJvPJOdH2ZcdVxDTfJvVPMdXQW8E+X7so8jI/q7fU8LNqZ8fBQ/66MnaYUrn51hflvJLux7O1PKH/g4F8BMRLQnyf0DRIyWwN9W8VwJ6332/2IB3xXBPgAEAzl2m/wyFOKMAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export default LockIcon;
