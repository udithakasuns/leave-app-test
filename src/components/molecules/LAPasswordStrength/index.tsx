import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Icon, Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { TID } from 'src/utils/testIds';
import { styles } from './styles';
import { Rule, RuleKeyMap } from './types';
import { ruleMap } from './ruleMap';

const { scale, colors } = theme;

interface Props {
    password: string;
    rules: Rule[];
    onUpdateRules: (rules: Rule[]) => void;
}

const LAPasswordStrength = ({ password, rules, onUpdateRules }: Props) => {
    const onMatchRules = () => {
        const ruleKeyMap: RuleKeyMap = {
            LOWER_CASE: /[a-z]/.test(password),
            UPPER_CASE: /[A-Z]/.test(password),
            ONE_NUMBER: /\d/.test(password),
            EIGHT_CHARACTER: password.length >= 8,
            SPECEAL_CHARACTER: /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/.test(
                password,
            ),
        };

        const matchedRules = rules.map(rule => ({
            ...rule,
            isMatched: ruleKeyMap[rule.key],
        }));

        const updatedCheckedCount = matchedRules.filter(
            rule => rule.isMatched,
        ).length;

        const { color } = ruleMap[updatedCheckedCount];

        onUpdateRules(
            matchedRules.map(rule => ({
                ...rule,
                color,
            })),
        );
    };

    const checkedCount = rules.filter(rule => rule.isMatched).length;

    const isStrokeFillable = (index: number): boolean => {
        const fillStokes = ruleMap[checkedCount].fillStrokes;
        if (index + 1 <= fillStokes) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        onMatchRules();
    }, [password]);

    return (
        <View>
            <View style={styles.srokeContainer}>
                {[...Array(4)].map((_, index) => (
                    <View
                        testID={`${TID}STROKE_${index.toString()}`}
                        style={[
                            styles.stroke,
                            {
                                marginRight: index === 3 ? 0 : scale.sc2,
                                borderTopColor: isStrokeFillable(index)
                                    ? ruleMap[checkedCount].color
                                    : colors.dividerColor,
                                borderTopWidth: isStrokeFillable(index) ? 2 : 1,
                            },
                        ]}
                    />
                ))}
            </View>
            <Spacer height={1} />
            <View style={styles.strokeTextContainer}>
                <Text testID={`${TID}TEXT_PW_STRENGTH`}>Password strength</Text>
                <Text testID={`${TID}TEXT_DYNAMIC_STRENGTH`}>
                    {ruleMap[checkedCount].strokeText}
                </Text>
            </View>
            <Spacer height={scale.sc8} />
            {rules.map((rule, index) => (
                <View style={styles.ruleContainer}>
                    <Icon
                        name={
                            rule.isMatched
                                ? 'check-circle'
                                : 'radio-button-unchecked'
                        }
                        color={rule.color}
                    />
                    <Spacer width={scale.sc1} />
                    <Text testID={`${TID}TEXT_RULE_${index.toString()}`}>
                        {rule.text}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default LAPasswordStrength;
