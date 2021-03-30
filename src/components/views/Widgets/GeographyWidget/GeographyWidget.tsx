import React, { useState } from 'react';
import { renderToString } from 'react-dom/server';
import { classes } from '@utils';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from 'react-leaflet'
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './GeographyWidget.css';
import Button from '@ui/Button/Button';
import { ReactComponent as AddIcon } from '@assets/icons/button/add.svg';
import { ReactComponent as MinusIcon } from '@assets/icons/button/minus.svg';
import WidgetCard from '../WidgetCard/WidgetCard';

const cls = classes('geography-widget');

interface IAnalyticGeographyData {
  cityName: string
  value: number
  latlng: number[]
}

interface IGeographyWidget {
  data: IAnalyticGeographyData[]
}

function MapConsumer({ zoom }: { zoom: number }) {
  const map = useMap()
  setTimeout(() => map.invalidateSize(), 100)
  map.zoomControl.remove();
  map.setView(map.getCenter(), zoom);
  return null
}

const GeographyWidget: React.FC<IGeographyWidget> = ({ data }) => {
  const [zoom, setZoom] = useState(3)
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const maxValue = Math.max(...data.map((marker: IAnalyticGeographyData) => marker.value))
  const getScaleMultiply = (value: number, max: number) => (value / max) + 0.5
  const markers = data.map((marker: IAnalyticGeographyData) => {
    const scale = getScaleMultiply(marker.value, maxValue);
    return (
      {
        latlng: marker.latlng,
        divicon: divIcon({
          className: 'geography-widget-divicon',
          html: renderToString(
            <div
              { ...cls('marker', { primary: scale >= 1 }) }
              style={ {
                transform: `scale(${scale})`
              } }
            >
              { marker.value }
            </div>
          )
        })
      }
    )
  });

  return (
    <WidgetCard
      { ...cls() }
      title="География"
      info="Тут подробная информация о необходимости этих значений и значения этих значений,
      а также значимости этих значений"
      hasDownloadButton
      hasFullScreenButton
      isOverlayHeader
      isZeroPadding
      onClickFullScreen={ forceUpdate }
    >
      <div { ...cls('controls') }>
        <Button
          { ...cls('button-plus') }
          icon={ AddIcon }
          size={ 24 }
          color="gray"
          onClick={ () => setZoom(zoom + 1) }
        />
        <Button
          { ...cls('button-minus') }
          icon={ MinusIcon }
          size={ 24 }
          color="gray"
          onClick={ () => setZoom(zoom - 1) }
        />
      </div>
      <MapContainer
        { ...cls('map') }
        center={ data[0].latlng as [number, number] }
        zoom={ zoom }
        scrollWheelZoom={ false }
      >
        <MapConsumer
          zoom={ zoom }
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          markers.map((marker, index: number) => (
            <Marker
              key={ index }
              position={ marker.latlng as [number, number] }
              icon={ marker.divicon }
            />
          ))
        }
      </MapContainer>
    </WidgetCard>
  )
};

export default GeographyWidget;
