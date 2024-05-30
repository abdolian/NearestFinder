export type MapProps = {
  latitude: number;
  longitude: number;
};

export function Map({ latitude, longitude }: MapProps) {
  const source = `https://api.mapbox.com/styles/v1/abdolian/clwtglpoe014e01qx07iacmtv.html?title=false&access_token=pk.eyJ1IjoiYWJkb2xpYW4iLCJhIjoiY2x3dGdrMXNzMDNhYjJxcXUyYjc1dDJoYiJ9.CwHH1rEaIiynwAl6XYISUA&zoomwheel=false#6/${latitude}/${longitude}`;
  return <iframe
    className="border-none rounded-lg"
    title="Monochrome"
    width="100%"
    height="400px"
    src={source}
  />
}