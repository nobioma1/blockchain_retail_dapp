import { Box, Stack, Text } from '@chakra-ui/react';
import SlickSlider from 'react-slick';
import PropTypes from 'prop-types';

const settings = {
  infinite: true,
  speed: 1000,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 3,
};

const SliderImage = ({ src }) => {
  const imgUrl = new URL(src, import.meta.url).href;
  return (
    <Box pr={2}>
      <Box
        height="200px"
        width="100%"
        backgroundImage={imgUrl}
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
        {Array.from(new Array(21).fill('_')).map((_, idx) => (
          <SliderImage key={idx} src={`../assets/${idx + 1}.jpg`} />
        ))}
      </SlickSlider>
    </Stack>
  );
};

SliderImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Slider;
