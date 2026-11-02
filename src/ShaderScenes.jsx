import {Dithering,ImageDithering} from '@paper-design/shaders-react';

export function Waves(){
 return <Dithering width="100%" height="100%" colorBack="#1d2321" colorFront="#a9bf95" shape="wave" type="4x4" size={2} speed={.13} scale={.8} minPixelRatio={1} maxPixelCount={320000}/>;
}
export function Photo(){
 return <ImageDithering width="100%" height="100%" image={new URL('./media/tera-1280.webp',document.baseURI).href} colorBack="#1d2321" colorFront="#b2c79b" colorHighlight="#e5e1d3" originalColors={false} type="8x8" size={2.4} colorSteps={2} fit="cover" minPixelRatio={1} maxPixelCount={420000}/>;
}
