import React from 'react';
import { View, Image } from 'react-native';
import { Spacer, Text } from 'components/atoms';
import { Img } from 'assets/images';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';
import { TID } from 'src/utils/testIds';
import { styles } from './styles';

interface Props {
    showLogo: boolean;
    title: string;
    subTitle: string;
}

const { colors, scale } = theme;

const LARootHeader = ({
    title,
    subTitle,
    showLogo = false,
}: AtLeast<Props, 'title' | 'subTitle'>) => (
    <View>
        {showLogo && (
            <>
                <Image style={styles.logo} source={Img('logo')} />
                <Spacer height={scale.sc20} />
            </>
        )}
        <Text testID={`${TID}TEXT_ROOT_HEADER_TITLE`} type='H1Bold'>
            {title}
        </Text>
        <Spacer height={scale.sc6} />
        <Text
            testID={`${TID}TEXT_ROOT_HEADER_SUBTITLE`}
            type='SubH'
            color={colors.gray600}>
            {subTitle}
        </Text>
        <Spacer height={scale.sc20} />
    </View>
);

export default React.memo(LARootHeader);
