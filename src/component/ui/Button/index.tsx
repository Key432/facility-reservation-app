export type ButtonProps = {
  label: string;
  className: string;
  onClick: () => void;
};

// NOTE: Partialを使うことで必須属性ではなくなります
/*
  NOTE: propsは親コンポーネントから状態をもらうときに使う方法です。タグの中に<Button label="hoge"/>というように書くと
  その値がpropsオブジェクトとして渡されます。
  propsのKeyを直接{}内に書くことで、keyの名前の定数にその値を受け取ることができます。これを「分割代入」といいます
  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

  以下はこのように書くのと同じです。（labelのみ抜粋）
  ```
  export default function Button(props){const label = props.label}
  ```
*/
export default function Button({
  label = '',
  className = '',
  onClick = () => undefined,
}: Partial<ButtonProps>) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}
