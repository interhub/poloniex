import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { TabTitleHeader } from '../../../components/HeadersBlack'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import HistoryEmpty from './HistoryEmpty'
import HistoryItem from './HistoryItem'

const HistoryTab = () => {
	const { history } = useSelectorStringHook('history')

	const IS_EMPTY = !history.length


	return (
		<View style={styles.container}>
			{!IS_EMPTY &&
				<>
					<TabTitleHeader title={'История'} />
					<FlatList
						initialNumToRender={3}
						windowSize={3}
						contentContainerStyle={{ padding: 20 }}
						data={history}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item: history_item, index }) => {
							return <HistoryItem history={history_item} />
						}}
						showsVerticalScrollIndicator={false} />
				</>
			}
			{IS_EMPTY && <>
				<TabTitleHeader title={'История'} />
				<HistoryEmpty />
			</>}
		</View>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default HistoryTab
