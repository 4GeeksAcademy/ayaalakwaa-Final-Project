"""empty message

Revision ID: 83fafb404829
Revises: 4dec2cce4cd1
Create Date: 2024-08-12 04:30:48.731217

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '83fafb404829'
down_revision = '4dec2cce4cd1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('code', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', sa.String(length=32), nullable=True))
        batch_op.add_column(sa.Column('date_created', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('date_modified', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('code', schema=None) as batch_op:
        batch_op.drop_column('date_modified')
        batch_op.drop_column('date_created')
        batch_op.drop_column('type')

    # ### end Alembic commands ###
