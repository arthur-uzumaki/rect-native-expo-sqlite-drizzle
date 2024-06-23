import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className='w-full  px-4 py-3 rounded-md bg-violet-800'
      activeOpacity={0.8}
    >
      <Text className='text-white text-center text-lg font-bold'>{title}</Text>
    </TouchableOpacity>
  );
}