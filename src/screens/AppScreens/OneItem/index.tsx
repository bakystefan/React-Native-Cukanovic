import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import styles from './styles';
import { AvatarItem } from '../../../components';
import { Header } from "../../../components";

type usersData = {
	id: number,
	email: string,
	first_name: string,
	last_name: string,
	avatar: string
}

interface Props {
	userSelected: usersData;
	userLoading: boolean;
	navigation: NavigationScreenProp<NavigationState>;
}

const OneItemActivity = () => (
	<View style={styles.containerIndicator}>
		<ActivityIndicator size="large" />
	</View>
)


const OneItem = ({ userSelected, userLoading, navigation }: Props) => {
	return (
		<View style={{ flex: 1 }}>
			<Header
			  isForBack
        title="One Item"
				leftButtonPress={() => navigation.goBack()}
      />
			{
				!userLoading && userSelected && (
					<View style={styles.oneContainer}>
						<AvatarItem avatar={userSelected.avatar} />
						<Text>{`NAME: ${userSelected.first_name} ${userSelected.last_name}`}</Text>
						<Text>{`EMAIL: ${userSelected.email}`}</Text>
					</View>
				) || <OneItemActivity />
			}
		</View>
	)
}

const mapStateToProps = (state: any) => ({
	userSelected: state.userSelected,
	loading: state.userLoading
});

export default connect(
	mapStateToProps
)(OneItem);