import React, { useState, useEffect } from "react"
import { View, FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import styles from "./styles";
import { ListItem } from "../../../components";
import {
	fetchUsersData,
	fetchMoreUsersData,
	fetchOneUser
} from "../../../redux/actions/fetch";

type usersData = {
	id: number,
	email: string,
	first_name: string,
	last_name: string,
	avatar: string
}

interface itemProp {
	item: usersData;
}

interface Props {
	navigation: NavigationScreenProp<NavigationState>;
	usersData: usersData[];
	loading: boolean;
	totalPages: number;
	fetchUsersData: (page?: number) => void;
	fetchMoreUsersData: (page?: number) => void;
	fetchOneUser: (id: number) => void;
}

const UserDataList = ({
	usersData,
	loading,
	navigation,
	totalPages,
	fetchUsersData,
	fetchMoreUsersData,
	fetchOneUser
}: Props) => {
	const [page, setPage] = useState(1);
	const checkForLoading: Function = (): void => {
		if (!loading) {
			setPage(page + 1)
		}
	};

	useEffect(() => {
		fetchUsersData(page);
	}, []);

	useEffect(() => {
		if (page > 1 && page <= totalPages) {
			fetchMoreUsersData(page);
		}
	}, [page])

	return (
		<View style={{ flex: 1, backgroundColor: 'black' }}>
			<FlatList
				data={usersData || []}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }: itemProp) => (
					<ListItem
						onPress={() => {
							fetchOneUser(item.id)
							navigation.navigate('OneItem')
						}}
						avatarUrl={item.avatar}
						title={`${item.first_name} ${item.last_name}`}
					/>
				)}
				onEndReached={() => checkForLoading()}
				ListFooterComponent={
					loading ? (
						<View style={styles.loadingFooter}>
							<ActivityIndicator />
						</View>
					) : null
				}
			/>
		</View>
	)
}

const mapStateToProps = (state: any) => ({
	usersData: state.data,
	totalPages: state.totalPages,
	loading: state.loading
});

function bindToAction(dispatch: any) {
	return {
		fetchUsersData: (page?: number) => dispatch(fetchUsersData(page)),
		fetchMoreUsersData: (page?: number) => dispatch(fetchMoreUsersData(page)),
		fetchOneUser: (id: number) => dispatch(fetchOneUser(id))
	};
}

export default connect(
	mapStateToProps,
	bindToAction
)(UserDataList);