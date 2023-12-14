import { Box, Stack, Text } from '@chakra-ui/react';
import SlickSlider from 'react-slick';
import PropTypes from 'prop-types';

import Image1 from '@assets/1.jpg';
import Image2 from '@assets/2.jpg';
import Image3 from '@assets/3.jpg';
import Image4 from '@assets/4.jpg';
import Image5 from '@assets/5.jpg';
import Image6 from '@assets/6.jpg';
import Image7 from '@assets/7.jpg';
import Image8 from '@assets/8.jpg';
import Image9 from '@assets/9.jpg';
import Image10 from '@assets/10.jpg';
import Image11 from '@assets/11.jpg';
import Image12 from '@assets/12.jpg';
import Image13 from '@assets/13.jpg';
import Image14 from '@assets/14.jpg';
import Image15 from '@assets/15.jpg';
import Image16 from '@assets/16.jpg';
import Image17 from '@assets/17.jpg';
import Image18 from '@assets/18.jpg';
import Image19 from '@assets/19.jpg';
import Image20 from '@assets/20.jpg';
import Image21 from '@assets/21.jpg';

const settings = {
  infinite: true,
  speed: 1000,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 3,
};

const SliderImage = ({ src }) => {
  return (
    <Box pr={2}>
      <Box
        height="200px"
        width="100%"
        backgroundImage={`url(${src})`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        borderRadius="md"
      />
    </Box>
  );
};

const Slider = () => {
  return (
    <Stack margin="0 auto" maxWidth="1280px" spacing={2}>
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Feel the World Under Your Feet
        </Text>
        <Text fontSize="lg" color="green.600">
          Coming soon to Futa this holiday 🎉 🎊 🎄
        </Text>
      </Box>
      <SlickSlider {...settings}>
        <SliderImage src={Image1} />
        <SliderImage src={Image2} />
        <SliderImage src={Image3} />
        <SliderImage src={Image4} />
        <SliderImage src={Image5} />
        <SliderImage src={Image6} />
        <SliderImage src={Image7} />
        <SliderImage src={Image8} />
        <SliderImage src={Image9} />
        <SliderImage src={Image10} />
        <SliderImage src={Image11} />
        <SliderImage src={Image12} />
        <SliderImage src={Image13} />
        <SliderImage src={Image14} />
        <SliderImage src={Image15} />
        <SliderImage src={Image16} />
        <SliderImage src={Image17} />
        <SliderImage src={Image18} />
        <SliderImage src={Image19} />
        <SliderImage src={Image20} />
        <SliderImage src={Image21} />
      </SlickSlider>
    </Stack>
  );
};

SliderImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Slider;
