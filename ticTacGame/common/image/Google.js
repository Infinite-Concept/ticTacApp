import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#4285F4"
      d="M19.995 12.181c0-.506-.044-1.013-.129-1.513h-7.695v3.007h4.406a3.671 3.671 0 0 1-.572 1.354c-.28.41-.641.76-1.062 1.032v2h2.628a7.814 7.814 0 0 0 1.848-2.688c.418-1.013.614-2.1.576-3.191Z"
    />
    <Path
      fill="#34A853"
      d="M12.171 20.002a7.884 7.884 0 0 0 5.4-1.94l-2.628-2a5.008 5.008 0 0 1-2.772.773 4.95 4.95 0 0 1-2.835-.931 4.783 4.783 0 0 1-1.747-2.376h-2.71v2.06a8.053 8.053 0 0 0 3.006 3.22 8.29 8.29 0 0 0 4.286 1.194Z"
    />
    <Path
      fill="#FBBC05"
      d="M7.589 13.528a4.554 4.554 0 0 1-.26-1.527c.003-.519.09-1.034.26-1.526v-2.06h-2.71A7.773 7.773 0 0 0 4 12.002c0 1.246.3 2.475.878 3.586l2.71-2.06Z"
    />
    <Path
      fill="#EA4335"
      d="M12.171 7.168a4.486 4.486 0 0 1 3.133 1.2l2.329-2.28a7.906 7.906 0 0 0-5.462-2.086 8.29 8.29 0 0 0-4.286 1.193 8.053 8.053 0 0 0-3.007 3.22l2.71 2.06A4.783 4.783 0 0 1 9.337 8.1a4.95 4.95 0 0 1 2.835-.932Z"
    />
  </Svg>
)
export default SvgComponent