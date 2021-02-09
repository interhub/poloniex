import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface ScrollViewContainerProps extends React.ComponentPropsWithoutRef<typeof ScrollView> {
    children: JSX.Element
}

const ScrollViewContainer = (props: ScrollViewContainerProps) => {
    const { top } = useSafeAreaInsets()
    return (
        <ScrollView
            contentContainerStyle={{ paddingTop: top }}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false} {...props} />
    )
}

export default ScrollViewContainer

