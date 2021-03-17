import React, { useState } from 'react';
import { renderToString } from 'react-dom/server';
import { classes } from '@utils';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap
} from 'react-leaflet'
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './GeographyWidget.css';
import Button from '@ui/Button/Button';
import { ReactComponent as FullScreenIcon } from '@assets/icons/button/full-screen.svg';
import { ReactComponent as AddIcon } from '@assets/icons/button/add.svg';
import { ReactComponent as MinusIcon } from '@assets/icons/button/minus.svg';

const cls = classes('geography-widget');

function MapConsumer({ zoom }: any) {
  const map = useMap()
  setTimeout(() => map.invalidateSize(), 100)
  map.zoomControl.remove();
  map.setView(map.getCenter(), zoom);
  return null
}

const GeographyWidget: React.FC<any> = ({ data }) => {
  const [isFullscreenActive, setIsFullscreenActive] = useState(false)
  const [zoom, setZoom] = useState(3)
  const maxValue = Math.max(...data.map((marker: any) => marker.value))
  const getScaleMultiply = (value: number, max: number) => (value / max) + 0.5
  const markers = data.map((marker: any) => {
    const scale = getScaleMultiply(marker.value, maxValue);
    return (
      {
        geo: marker.geo,
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
    <section { ...cls('', { 'full-screen': isFullscreenActive }) }>
      <div { ...cls('controls') }>
        <Button
          { ...cls('button-full-screen') }
          icon={ FullScreenIcon }
          size={ 24 }
          color="gray"
          transparent
          onClick={ () => setIsFullscreenActive(!isFullscreenActive) }
        />
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
        center={ data[0].geo }
        zoom={ zoom }
        placeholder={ isFullscreenActive }
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
          markers.map((marker: any, index: number) => (
            <Marker
              key={ index }
              position={ marker.geo }
              icon={ marker.divicon }
            />
          ))
        }
      </MapContainer>
    </section>
  )
};

export default GeographyWidget;
