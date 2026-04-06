export const useMarketingHeaderAppearance = () => {
	const isHeaderTransparent = useState<boolean>(
		"marketing-header-transparent",
		() => false,
	);

	const setHeaderTransparent = (transparent: boolean) => {
		isHeaderTransparent.value = transparent;
	};

	const resetHeaderAppearance = () => {
		isHeaderTransparent.value = false;
	};

	return {
		isHeaderTransparent,
		setHeaderTransparent,
		resetHeaderAppearance,
	};
};
