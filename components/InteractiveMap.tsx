"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { FeatureCollection } from 'geojson'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { GeoJSON, LayersControl, MapContainer, TileLayer } from 'react-leaflet'

// Sample GeoJSON data (replace with your actual data)
const sampleGeoJSON: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.2, 42.2],
            [-71.2, 42.5],
            [-70.9, 42.5],
            [-70.9, 42.2],
            [-71.2, 42.2]
          ]
        ]
      }
    }
  ]
}

// Define the style type
type LayerStyle = {
  weight: number;
  opacity: number;
  color: string;
  fillOpacity: number;
}

const layerStyles: Record<string, LayerStyle> = {
  population: {
    weight: 2,
    opacity: 1,
    color: 'red',
    fillOpacity: 0.5
  },
  landUse: {
    weight: 2,
    opacity: 1,
    color: 'blue',
    fillOpacity: 0.5
  },
  transportation: {
    weight: 2,
    opacity: 1,
    color: 'green',
    fillOpacity: 0.5
  }
}

export default function InteractiveMap() {
  const [activeLayers, setActiveLayers] = useState({
    population: true,
    landUse: false,
    transportation: false,
  })

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }))
  }

  const mapCenter: LatLngExpression = [42.3601, -71.0589]
  const mapZoom = 10

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Interactive Map with Layer Toggle</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] relative">
          <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LayersControl position="topright">
              {activeLayers.population && (
                <LayersControl.Overlay checked name="Population Density">
                  <GeoJSON data={sampleGeoJSON} style={layerStyles.population} />
                </LayersControl.Overlay>
              )}
              {activeLayers.landUse && (
                <LayersControl.Overlay checked name="Land Use">
                  <GeoJSON data={sampleGeoJSON} style={layerStyles.landUse} />
                </LayersControl.Overlay>
              )}
              {activeLayers.transportation && (
                <LayersControl.Overlay checked name="Transportation">
                  <GeoJSON data={sampleGeoJSON} style={layerStyles.transportation} />
                </LayersControl.Overlay>
              )}
            </LayersControl>
          </MapContainer>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="population-layer"
              checked={activeLayers.population}
              onCheckedChange={() => toggleLayer('population')}
            />
            <Label htmlFor="population-layer">Population Density</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="land-use-layer"
              checked={activeLayers.landUse}
              onCheckedChange={() => toggleLayer('landUse')}
            />
            <Label htmlFor="land-use-layer">Land Use</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="transportation-layer"
              checked={activeLayers.transportation}
              onCheckedChange={() => toggleLayer('transportation')}
            />
            <Label htmlFor="transportation-layer">Transportation</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

