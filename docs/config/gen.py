import json
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.cm as cm
import argparse

def main(map_file, size_file):
    # Read the JSON file
    with open(map_file, 'r') as f:
        map_data = json.load(f)

    with open(size_file, 'r') as f:
        size_data = json.load(f)

    # Get all object types and assign a color to each type
    object_types = list(size_data.keys())
    colormap = cm.get_cmap('tab10', len(object_types))
    colors = {obj_type: colormap(i) for i, obj_type in enumerate(object_types)}

    # Create the plot
    fig, ax = plt.subplots()
    ax.set_xlim(0, size_data['map']['width'])
    ax.set_ylim(0, size_data['map']['height'])
    ax.set_aspect('equal')

    # List of patches for the legend
    legend_patches = []

    # Draw the player
    player_pos = map_data['player']['position']
    player_size = size_data['player']
    player_patch = patches.Rectangle((player_pos['x'], player_pos['y']), player_size['size'], player_size['size'], color=colors['player'])
    ax.add_patch(player_patch)
    legend_patches.append(patches.Patch(color=colors['player'], label='player'))

    # Draw the enemies
    for enemy in map_data['enemies']:
        enemy_pos = enemy['position']
        enemy_type = enemy['type']
        enemy_size = size_data[enemy_type]
        enemy_patch = patches.Rectangle((enemy_pos['x'], enemy_pos['y']), enemy_size['size'], enemy_size['size'], color=colors[enemy_type])
        ax.add_patch(enemy_patch)
        if enemy_type not in [patch.get_label() for patch in legend_patches]:
            legend_patches.append(patches.Patch(color=colors[enemy_type], label=enemy_type))

   # Draw the obstacles
    for obstacle in map_data['obstacles']:
        obstacle_pos = obstacle['position']
        obstacle_type = obstacle['type']
        obstacle_size = size_data[obstacle_type]
        obstacle_patch = patches.Rectangle((obstacle_pos['x'], obstacle_pos['y']), obstacle_size['size'], obstacle_size['size'], color=colors[obstacle_type])
        ax.add_patch(obstacle_patch)
        if obstacle_type not in [patch.get_label() for patch in legend_patches]:
            legend_patches.append(patches.Patch(color=colors[obstacle_type], label=obstacle_type))

    # Add the legend
    ax.legend(handles=legend_patches, loc='upper right', bbox_to_anchor=(1.2, 1))

    # Display the plot
    plt.gca().invert_yaxis()  # Invert y-axis to match typical screen coordinates
    plt.show()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate a map visualization from JSON files.")
    parser.add_argument('map_file', type=str, help='Path to the map.json file')
    parser.add_argument('size_file', type=str, help='Path to the size.json file')
    args = parser.parse_args()

    main(args.map_file, args.size_file)