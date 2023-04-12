import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../styles/theme";
import { mockGeographyData as data } from "../data/mockData";
import useMediaQuery from "@mui/material/useMediaQuery";
const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:1080px)");
  return (
    <ResponsiveChoropleth
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.gray[100],
            },
          },
          legend: {
            text: {
              fill: colors.gray[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.gray[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.gray[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.gray[100],
          },
        },
      }}
      features={geoFeatures.features}
      margin={
        isMobile
          ? { top: 30, right: 0, bottom: 0, left: 35 }
          : { top: -10, right: 0, bottom: 0, left: 0 }
      }
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isMobile ? 50 : 70}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: isMobile ? -25 : 20,
                translateY: isMobile ? -50 : -100,
                itemsSpacing: 0,
                itemWidth: isMobile ? 75 : 94,
                itemHeight: isMobile ? 14 : 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.gray[100],
                itemOpacity: 0.85,
                symbolSize: isMobile ? 10 : 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default GeographyChart;
