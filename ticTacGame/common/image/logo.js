import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={158}
    height={136}
    fill="none"
    {...props}
  >
    <Path
      fill="#ADADAD"
      d="M0 26.906 32.55 0H158l-32.55 26.906h-22.965v82.566L70.563 136V26.906H0Z"
    />
  </Svg>
)
export default SvgComponent
