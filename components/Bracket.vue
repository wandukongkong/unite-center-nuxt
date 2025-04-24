<script setup>
import { toRef, computed } from 'vue';

const props = defineProps({
	teamList: {
		type: Array,
		default: () => [
			{
				teamName: 'TeamA',
			},
			{
				teamName: 'TeamB',
			},
			{
				teamName: 'TeamC',
			},
			{
				teamName: 'TeamD',
			},
			{
				teamName: 'TeamE',
			},
		],
	},
});

// TODO: 하위 3팀을 제외하고 1매치만 남는지 체크
const checkRoundTeam = list => {
	const lastRoundInfo = list.at(-1);
	const lastTeamList = lastRoundInfo.matchList.reduce((result, matchInfo) => {
		matchInfo.teamList.forEach(teamInfo => result.push(teamInfo));
	}, []);

	if (lastRoundInfo.round === 1) {
		list.push({
			round: lastRoundInfo.round + 1,
			matchList: chunkTeam(Math.ceil(Array(lastTeamList.length / 2, 20).fill({}))),
		});
	} else {
		// check Team 3팀제외하고 1매치 남는지 체크
		if (lastTeamList.length - 3 === 2) {
			list.push({
				round: lastRoundInfo.round + 1,
				matchList: chunkTeam([
					{
						teamName: '',
					},
					{
						teamName: '',
					},
				]),
			});

			list.push({
				round: lastRoundInfo.round + 2,
				matchList: chunkTeam([
					{
						teamName: '',
					},
					{
						teamName: '',
					},
					{
						teamName: '',
					},
					{
						teamName: '',
					},
				]),
			});
		} else {
			list.push({
				round: lastRoundInfo.round + 1,
				matchList: chunkTeam(lastTeamList),
			});
		}

		// if (lastTeamList.length > 4) {
		//   list = checkRoundTeam(list);
		// } else {
		// }
	}
	return list;
};

const chunkTeam = (list, chunkNumber = 2) => {
	return list.reduce((result, info, index) => {
		if (index === 0) {
			result.push({
				match: 1,
				config: {
					x: 0,
					y: 20,
				},
				teamList: [],
			});
		}

		if (result.at(-1).teamList.length === chunkNumber) {
			const lastMatchInfo = result.at(-1);

			result.push({
				match: lastMatchInfo.match + 1,
				config: {
					x: 0,
					y: lastMatchInfo.config.y + 100,
				},
				teamList: [],
			});
		}

		result.at(-1).teamList.push(info);

		return result;
	}, []);
};

// matchList: [
//   {
//     match: 1,
//     teamList: [{},{}]
//   }
// ]

// TODO:
const convertedTournamentList = computed(() => {
	// let firstRoundList = [
	//   {
	//     round: 1,
	//     matchList: chunkTeam(props.teamList),
	//   },
	// ];

	// const otherRoundList = checkRoundTeam(firstRoundList);

	return [
		{
			round: 1,
			matchList: [
				{
					match: 1,
					config: {
						stroke: 'black',
						strokeWidth: 1,
						y: 30,
					},
					teamList: [
						{
							teamName: 'teamA',
						},
						{
							teamName: 'teamB',
						},
					],
				},
				{
					match: 2,
					config: {
						stroke: 'black',
						strokeWidth: 1,
						y: 150,
					},
					teamList: [
						{
							teamName: 'teamC',
						},
						{
							teamName: 'teamD',
						},
					],
				},
				{
					match: 3,
					config: {
						stroke: 'black',

						strokeWidth: 1,
						y: 270,
					},
					teamList: [
						{
							teamName: 'teamE',
						},
						{
							teamName: 'teamF',
						},
					],
				},
			],
		},
		{
			round: 2,
			matchList: [
				{
					match: 4,
					config: {
						stroke: 'black',
						strokeWidth: 1,
						y: 90,
					},
					teamList: [
						{
							teamName: '',
						},
						{
							teamName: '',
						},
					],
				},
				{
					match: 5,
					config: {
						stroke: 'black',
						strokeWidth: 1,
						y: 210,
					},
					teamList: [
						{
							teamName: '',
						},
					],
				},
			],
		},
		{
			round: 3,
			matchList: [
				{
					match: 4,
					config: {
						stroke: 'black',
						strokeWidth: 1,
						y: 150,
					},
					teamList: [
						{
							teamName: '',
						},
						{
							teamName: '',
						},
					],
				},
			],
		},
	];
});

const configKonva = toRef({
	width: window.screen.width,
	height: window.screen.height,
});

const matchRectInfo = toRef({
	x: -5,
	width: 180,
	height: 90,
	stroke: 'black',
	strokeWidth: 1,
});

const teamRectInfo = toRef({
	x: 0,
	width: 170,
	height: 30,
	stroke: 'black',
	strokeWidth: 1,
	fill: 'white',
	cornerRadius: 3,
	shadowBlur: 0,
	// draggable: true,
});

const teamNameTextConfig = toRef({
	x: 5,
	y: 5,
	fontSize: 10,
});

const hoverMouse = e => {
	e.target.to({
		scaleX: 1.03,
		scaleY: 1.03,
		duration: 0.05,
		shadowBlur: 5,
	});
};

const leaveMouse = e => {
	e.target.to({
		scaleX: 1,
		scaleY: 1,
		duration: 0.1,
		shadowBlur: 0,
	});
};
</script>
<template>
	<v-stage :config="configKonva">
		<!-- Round -->
		<v-layer
			v-for="(tournamentInfo, tournamentInfoIndex) in convertedTournamentList"
			:key="tournamentInfoIndex"
			:config="{
				x: 110 + 300 * tournamentInfoIndex,
				y: 50,
			}"
		>
			<v-text :config="{ text: `${tournamentInfo.round} Round`, fontSize: 15 }" />
			<!-- match -->
			<v-group
				v-for="(matchInfo, matchInfoIndex) in tournamentInfo.matchList"
				:key="matchInfoIndex"
				:config="{
					x: matchInfo?.config?.x ?? 0,
					y: matchInfo?.config?.y ?? 0,
					stroke: 'black',
					strokeWidth: 1,
				}"
			>
				<v-rect
					:config="{
						...matchRectInfo,
					}"
				>
				</v-rect>
				<!-- team -->
				<v-group
					v-for="(teamInfo, teamInfoIndex) in matchInfo.teamList"
					:config="{
						y: 10 + 40 * teamInfoIndex,
					}"
				>
					<v-rect
						:key="teamInfoIndex"
						:config="{
							...teamRectInfo,
						}"
					>
					</v-rect>
					<v-text :config="{ text: teamInfo.teamName, ...teamNameTextConfig }"></v-text>
				</v-group>
			</v-group>
		</v-layer>
	</v-stage>
</template>
<style></style>
