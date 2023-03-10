import React from 'react';
import { Image } from 'react-native';
import { Spacer, Text } from 'components/atoms';
import { Img } from 'assets/images';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';
import { styles } from './styles';

interface Props {
    description: string;
}

const { colors, scale } = theme;

const LASigninHeader = ({ description }: AtLeast<Props, 'description'>) => (
    <>
        <Image style={styles.logo} source={Img('logo')} />
        <Spacer height={scale.sc20} />
        <Text type='H1Bold'>Sign in</Text>
        <Spacer height={scale.sc6} />
        <Text type='SubH' color={colors.gray600}>
            {description}
        </Text>
        <Spacer height={scale.sc20} />
    </>
);

export default React.memo(LASigninHeader);
