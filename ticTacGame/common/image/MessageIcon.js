import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      stroke="#8F8996"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="M12.95 4.796 9.753 7.372a1.667 1.667 0 0 1-2.06 0L4.466 4.796"
    />
    <Path
      stroke="#8F8996"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="M5.166.625h7.07c1.02.011 1.99.442 2.686 1.193a3.763 3.763 0 0 1 .994 2.778v4.896a3.763 3.763 0 0 1-.994 2.777 3.718 3.718 0 0 1-2.685 1.193H5.166c-2.19 0-3.666-1.781-3.666-3.97V4.596C1.5 2.406 2.976.625 5.166.625Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
