<template>
	<div id="app">
		<PolywoodBanner :enable-parallax="false" />
		<NavBar />

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
			libero diam, mollis sed lacus a, congue sagittis leo. Pellentesque
			eu feugiat urna. Praesent lorem nisl, blandit ut eros ac, tristique
			placerat elit. Cras eu felis eu neque venenatis congue in vitae
			elit. Suspendisse ac purus eu nulla feugiat sagittis non vitae nunc.
			Curabitur et ante vel risus gravida tempus. Pellentesque a erat ex.
			Nullam justo felis, imperdiet vel interdum at, tempus iaculis nisl.
			Sed id iaculis risus. Praesent ac suscipit nisl. Aliquam ut mauris
			at dolor porta volutpat. Sed sit amet lectus ut diam vehicula
			aliquet at eget libero. Aenean gravida mauris mauris, finibus
			interdum elit dignissim in.
			<br />
			Ut lobortis sem id mi dictum fermentum. Nam eu varius elit. Donec
			quis ipsum dapibus, semper nisi eget, feugiat ipsum. Vivamus turpis
			nisi, congue sit amet porttitor in, vestibulum ac massa. Maecenas eu
			egestas justo. Mauris molestie nec quam at suscipit. Orci varius
			natoque penatibus et magnis dis parturient montes, nascetur
			ridiculus mus.
			<br />
			Morbi vitae libero vel ipsum volutpat sagittis gravida et tellus.
			Nulla ut purus lacus. Donec nibh lacus, imperdiet et lacus nec,
			suscipit rhoncus mi. Duis viverra felis ac cursus fermentum. Nunc
			commodo, lacus eget tempus pulvinar, neque diam pharetra dui, ac
			consectetur leo sem congue dolor. Praesent at elit vitae est
			pulvinar pharetra. Sed felis tellus, elementum ut iaculis eget,
			maximus consectetur lorem. Curabitur quis justo sed nulla tempor
			eleifend nec quis justo. Vestibulum ac tempus lorem. Nunc porta
			mattis elit, quis efficitur arcu luctus id. Proin rutrum sit amet
			metus in ornare. Aenean accumsan purus sit amet est consectetur
			auctor.
			<br />
			Pellentesque non dui quis neque pretium interdum. Quisque in egestas
			nisl, quis condimentum libero. Pellentesque id rutrum lacus. Mauris
			placerat vehicula lectus at tempus. Pellentesque nec imperdiet
			felis, sed dictum risus. Sed vel risus et nibh malesuada pulvinar.
			Morbi vel mi in lectus molestie hendrerit in vitae velit. Proin
			elementum erat sed enim feugiat, eu ornare leo sollicitudin. Nam est
			mi, pellentesque et urna non, pharetra pretium magna. Donec quis ex
			arcu. Vivamus varius ipsum eu ipsum facilisis, a iaculis orci
			pharetra. Cras sed cursus odio, quis aliquam nisl. Nunc malesuada
			sed risus non gravida.
			<br />
			Sed vitae mi pharetra, varius risus in, scelerisque ligula. Nam
			malesuada egestas orci, ac dictum sapien euismod quis. Maecenas
			pellentesque metus eu ultricies ultricies. Sed interdum lobortis
			tincidunt. Aenean scelerisque imperdiet lectus ac malesuada. Donec
			pharetra ipsum sagittis semper facilisis. Vestibulum pretium nec
			lectus nec lobortis. Nullam euismod nulla elementum, laoreet sapien
			id, suscipit urna. Aliquam congue ullamcorper arcu, non gravida
			neque eleifend in. Curabitur eget sapien interdum, viverra arcu vel,
			eleifend quam. Nulla lobortis viverra lectus, at suscipit orci
			facilisis a. Sed porta tellus blandit, eleifend elit et, elementum
			augue. Aenean viverra risus ut nibh dapibus feugiat. Aliquam ornare
			ex sit amet libero venenatis, eu dignissim ligula tempor.
		</p>
	</div>
</template>

<script>
import PolywoodBanner from "./components/PolywoodBanner";
import NavBar from "./components/NavBar";

export default {
	name: "app",
	components: {
		PolywoodBanner,
		NavBar,
	},
};
</script>

<style>
@import "assets/style.css";
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

p {
	margin: 0 20%;
	font-size: 20pt;
}
</style>
