import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="#8F8996"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M10.318 6.086v-1.61a3.414 3.414 0 0 0-3.414-3.414 3.413 3.413 0 0 0-3.427 3.399v1.625"
    />
    <Path
      stroke="#8F8996"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M9.762 14.937h-5.73a2.844 2.844 0 0 1-2.844-2.844V8.876a2.844 2.844 0 0 1 2.844-2.844h5.73a2.844 2.844 0 0 1 2.845 2.844v3.217a2.844 2.844 0 0 1-2.845 2.844Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#8F8996"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M6.897 9.652v1.666"
    />
  </Svg>
)
export default SvgComponent
