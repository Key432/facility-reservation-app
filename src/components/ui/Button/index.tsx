import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

// NOTE: Partialを使うことで必須属性ではなくなります
/*
  NOTE: propsは親コンポーネントから状態をもらうときに使う方法です。タグの中に<Button label="hoge"/>というように書くと
  その値がpropsオブジェクトとして渡されます。
  propsのKeyを直接{}内に書くことで、keyの名前の定数にその値を受け取ることができます。これを「分割代入」といいます。
  また、イコールで値を渡すことで、その値がわたってこなかった時のデフォルトの引数を決めることができます。
  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

  以下はこのように書くのと同じです。（labelのみ抜粋）
  ```
  export default function Button(props){const label: string = props?.label ?? ""}
  ```

  また、`{label, ...props}`の`...props`というのは残余引数という、
  分割代入で一部の値を取得した後のほかの値を新しいオブジェクトリテラルとして受け取る方法です。
  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/rest_parameters
*/
export default function Button({ label = '', ...props }: Partial<ButtonProps>) {
  return <button {...props}>{label}</button>;
}
