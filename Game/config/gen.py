import json
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.cm as cm
import argparse

def main(map_file, size_file):
    # 读取 JSON 文件
    with open(map_file, 'r') as f:
        map_data = json.load(f)

    with open(size_file, 'r') as f:
        size_data = json.load(f)

    # 获取所有对象类型，并为每种对象类型分配颜色
    object_types = list(size_data.keys())
    colormap = cm.get_cmap('tab10', len(object_types))
    colors = {obj_type: colormap(i) for i, obj_type in enumerate(object_types)}

    # 创建绘图
    fig, ax = plt.subplots()
    ax.set_xlim(0, size_data['map']['width'])
    ax.set_ylim(0, size_data['map']['height'])
    ax.set_aspect('equal')

    # 用于图例的补丁列表
    legend_patches = []

    # 绘制玩家
    player_pos = map_data['player']['position']
    player_size = size_data['player']
    player_patch = patches.Rectangle((player_pos['x'], player_pos['y']), player_size['size'], player_size['size'], color=colors['player'])
    ax.add_patch(player_patch)
    legend_patches.append(patches.Patch(color=colors['player'], label='player'))

    # 绘制敌人
    for enemy in map_data['enemies']:
        enemy_pos = enemy['position']
        enemy_type = enemy['type']
        enemy_size = size_data[enemy_type]
        enemy_patch = patches.Rectangle((enemy_pos['x'], enemy_pos['y']), enemy_size['size'], enemy_size['size'], color=colors[enemy_type])
        ax.add_patch(enemy_patch)
        if enemy_type not in [patch.get_label() for patch in legend_patches]:
            legend_patches.append(patches.Patch(color=colors[enemy_type], label=enemy_type))

    # 绘制障碍物
    for obstacle in map_data['obstacles']:
        obstacle_pos = obstacle['position']
        obstacle_type = obstacle['type']
        obstacle_size = size_data[obstacle_type]
        obstacle_patch = patches.Rectangle((obstacle_pos['x'], obstacle_pos['y']), obstacle_size['size'], obstacle_size['size'], color=colors[obstacle_type])
        ax.add_patch(obstacle_patch)
        if obstacle_type not in [patch.get_label() for patch in legend_patches]:
            legend_patches.append(patches.Patch(color=colors[obstacle_type], label=obstacle_type))

    # 添加图例
    ax.legend(handles=legend_patches, loc='upper right', bbox_to_anchor=(1.2, 1))

    # 显示图形
    plt.gca().invert_yaxis()  # Invert y-axis to match typical screen coordinates
    plt.show()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate a map visualization from JSON files.")
    parser.add_argument('map_file', type=str, help='Path to the map.json file')
    parser.add_argument('size_file', type=str, help='Path to the size.json file')
    args = parser.parse_args()

    main(args.map_file, args.size_file)