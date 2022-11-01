# stylelint-disable


import rasterio
import rasterio.features
import rasterio.warp
import json

with rasterio.open('Aboveground_Biomass_current.tif') as dataset:

    # print(dataset.read())
    print(dataset.count)


    # Read the dataset's valid data mask as a ndarray.
    mask = dataset.dataset_mask()

    # Extract feature shapes and values from the array.
    for geom, val in rasterio.features.shapes(
            mask, transform=dataset.transform):

        # Transform shapes from the dataset's own coordinate
        # reference system to CRS84 (EPSG:4326).
        geom = rasterio.warp.transform_geom(
            dataset.crs, 'EPSG:4326', geom, precision=6)

        # Print GeoJSON shapes to stdout.
        print(geom)

        json_object = json.dumps(geom, indent=4)

        # # Writing to sample.json
        # with open("sample.json", "w") as outfile:
        #     outfile.write(json_object)